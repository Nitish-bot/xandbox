import { Module } from '@nestjs/common';
import { PrpcService } from './prpc.service';
import { HttpModule } from '@nestjs/axios';
import { GeolocationService } from './geolocation.service';

@Module({
  imports: [HttpModule],
  providers: [PrpcService, GeolocationService],
  exports: [PrpcService, GeolocationService],
})
export class ExternApiModule {}
