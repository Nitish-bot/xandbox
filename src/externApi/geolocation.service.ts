import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

export interface GeoResponse {
  status: string;
  lon: number;
  lat: number;
  country: string;
  city: string;
  org: string;
  query: string;
}

@Injectable()
export class GeolocationService {
  constructor(private readonly http: HttpService) {}

  async fetchGeo(addresses: string[]) {
    const payload = addresses.map((address) => {
      return {
        query: address,
        fields: 'status,lon,lat,country,city,org,query',
      };
    });
    const res = await firstValueFrom(
      this.http.post<GeoResponse[]>('http://ip-api.com/batch', payload),
    );

    return res.data;
  }
}
