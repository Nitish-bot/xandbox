import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ValidatorsModule } from './validators/validators.module';
import { ConfigModule } from '@nestjs/config';
import { IngestionModule } from './ingestion/ingestion.module';
import { ScheduleModule } from '@nestjs/schedule';
import { PrpcModule } from './prpc/prpc.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    DatabaseModule,
    IngestionModule,
    ValidatorsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrpcModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
