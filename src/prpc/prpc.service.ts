import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

interface RpcResponse {
  error: null | object;
  id: number;
  jsonrpc: number;
  result: {
    pods: Pod[];
  };
  total_count: number;
}

export interface Pod {
  address: string;
  is_public: boolean;
  last_seen_timestamp: number;
  pubkey: string;
  rpc_port: number;
  storage_committed: number;
  storage_usage_percent: number;
  storage_used: number;
  uptime: number;
  version: string;
}

interface IpAndPort {
  ipAddress: string;
  rpcPort: number;
}

const RPC_PAYLOAD = {
  jsonrpc: '2.0',
  method: 'get-pods-with-stats',
  id: '1',
};

@Injectable()
export class PrpcService {
  constructor(private readonly http: HttpService) {}

  async fetchFromPrpc(publicRpcs: IpAndPort[], logger: Logger) {
    const controller = new AbortController();

    const requests: Promise<Pod[]>[] = publicRpcs.map(
      async ({ ipAddress, rpcPort }) => {
        return await this.queryRpc(ipAddress, rpcPort, controller);
      },
    );

    try {
      return await Promise.any(requests);
    } catch (e) {
      logger.debug(`All RPC nodes failed to respond`, e);
      throw new Error('All RPC nodes failed to respond');
    }
  }

  private async queryRpc(
    ip: string,
    port: number,
    controller: AbortController,
  ): Promise<Pod[]> {
    const url = `http://${ip}:${port}/rpc`;

    const response = await firstValueFrom(
      this.http.post<RpcResponse>(url, RPC_PAYLOAD, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 5_000,
        signal: controller.signal,
      }),
    );

    controller.abort(); // cancel remaining requests
    return response.data.result.pods;
  }
}
