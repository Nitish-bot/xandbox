import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { Prisma } from 'prisma/generated/client';
import { ValidatorsService } from 'src/validators/validators.service';
import { PrpcService } from 'src/externApi/prpc.service';
import axios from 'axios';
import { EnrichedPod, EnrichmentService } from './enrichment.service';

@Injectable()
export class IngestionService implements OnApplicationBootstrap {
  private readonly logger = new Logger(IngestionService.name);

  constructor(
    private readonly validatorDb: ValidatorsService,
    private readonly pRpc: PrpcService,
    private readonly enrichment: EnrichmentService,
  ) {}

  async onApplicationBootstrap() {
    await this.pollAndIngest();
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async pollAndIngest() {
    try {
      const publicRpcs = await this.validatorDb.findLatestPublicIp();
      const pods = await this.pRpc.fetchFromPrpc(publicRpcs, this.logger);

      if (!pods.length) {
        this.logger.warn('RPC responded but returned no pods');
      }
      console.log(pods[0]);

      const enrichedData = await this.enrichment.enrich(pods);
      const inputData = this.mapPodsToPrisma(enrichedData);
      await this.validatorDb.createMany(inputData);
    } catch (e) {
      if (axios.isCancel(e)) {
        return;
      }
      this.logger.error('Validator ingestion failed', e);
    }
  }

  private mapPodsToPrisma(pods: EnrichedPod[]): Prisma.NodesCreateInput[] {
    return pods.map((pod) => {
      const address = pod.address.split(':');
      return {
        ipAddress: address[0],
        isPublic: pod.is_public,
        lastSeenTimestamp: pod.last_seen_timestamp,
        pubkey: pod.pubkey,
        rpcPort: pod.rpc_port,
        nodePort: +address[1],
        storageCommitted: pod.storage_committed,
        storageUsagePercent: pod.storage_usage_percent,
        storageUsed: pod.storage_used,
        uptime: pod.uptime,
        version: pod.version,
        longitude: pod.longitude,
        latitude: pod.latitude,
        country: pod.country,
        city: pod.city,
        organisation: pod.organisation,
      };
    });
  }
}
