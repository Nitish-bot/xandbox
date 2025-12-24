import { Module } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { ValidatorsModule } from 'src/validators/validators.module';
import { PrpcModule } from 'src/prpc/prpc.module';

@Module({
  imports: [PrpcModule, ValidatorsModule],
  providers: [IngestionService],
})
export class IngestionModule {}
