import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { Prisma } from 'prisma/generated/client';
import { ValidatorsService } from 'src/validators/validators.service';
import { PrpcService, type Pod } from 'src/prpc/prpc.service';
import axios from 'axios';

@Injectable()
export class IngestionService implements OnApplicationBootstrap {
  private readonly logger = new Logger(IngestionService.name);

  constructor(
    private readonly pRpc: PrpcService,
    private readonly validatorDb: ValidatorsService,
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

      const inputData = this.mapPodsToPrisma(pods);
      await this.validatorDb.createMany(inputData);
    } catch (e) {
      if (axios.isCancel(e)) {
        return;
      }
      this.logger.error('Validator ingestion failed', e);
    }
  }

  private mapPodsToPrisma(pods: Pod[]): Prisma.ValidatorsCreateInput[] {
    return pods.map((pod) => ({
      ipAddress: pod.address.split(':')[0],
      isPublic: pod.is_public,
      lastSeenTimestamp: pod.last_seen_timestamp,
      pubkey: pod.pubkey,
      rpcPort: pod.rpc_port,
      storageCommitted: pod.storage_committed,
      storageUsagePercent: pod.storage_usage_percent,
      storageUsed: pod.storage_used,
      uptime: pod.uptime,
      version: pod.version,
    }));
  }
}
