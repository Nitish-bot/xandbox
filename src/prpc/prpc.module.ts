import { Module } from '@nestjs/common';
import { PrpcService } from './prpc.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [PrpcService],
  exports: [PrpcService],
})
export class PrpcModule {}
