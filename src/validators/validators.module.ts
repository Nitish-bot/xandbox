import { Module } from '@nestjs/common';
import { ValidatorsService } from './validators.service';
import { ValidatorsController } from './validators.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [ValidatorsController],
  providers: [ValidatorsService],
  imports: [DatabaseModule],
  exports: [ValidatorsService],
})
export class ValidatorsModule {}
