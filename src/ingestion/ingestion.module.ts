import { Module } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { ValidatorsModule } from 'src/validators/validators.module';
import { ExternApiModule } from 'src/externApi/externApi.module';
import { EnrichmentService } from './enrichment.service';

@Module({
  imports: [ExternApiModule, ValidatorsModule],
  providers: [IngestionService, EnrichmentService],
})
export class IngestionModule {}
