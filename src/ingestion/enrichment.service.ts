import { Injectable } from '@nestjs/common';
import {
  GeolocationService,
  GeoResponse,
} from 'src/externApi/geolocation.service';
import { Pod } from 'src/externApi/prpc.service';

export interface EnrichedPod extends Pod {
  longitude?: number;
  latitude?: number;
  country?: string;
  city?: string;
  organisation?: string;
}

@Injectable()
export class EnrichmentService {
  constructor(private readonly geolocation: GeolocationService) {}

  async enrich(pods: Pod[]): Promise<EnrichedPod[]> {
    const ips = pods.map((pod) => pod.address.split(':')[0]);
    const geolocationMap = await this.mapIpToGeolocation(ips);
    if (!geolocationMap) {
      throw new Error('map issue');
    }

    const enrichedData = pods.map((pod) => {
      const podGeo = geolocationMap.get(pod.address.split(':')[0]);
      if (!podGeo) {
        // console.log('pod caant see location of', pod);
        return pod;
      }
      return {
        ...pod,
        ...podGeo,
        longitude: podGeo.lon,
        latitude: podGeo.lat,
        organisation: podGeo.org,
      };
    });

    return enrichedData;
  }

  private async mapIpToGeolocation(addresses: string[]) {
    const chunks = this.chunkArray(addresses, 90);

    const map = new Map<string, GeoResponse>();
    for (const chunk of chunks) {
      const batch = await this.geolocation.fetchGeo(chunk);
      for (const res of batch) {
        if (res.status === 'fail') {
          continue;
        }
        map.set(res.query, res);
      }
    }

    return map;
  }

  private chunkArray<T>(arr: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  }
}
