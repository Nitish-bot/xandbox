import { Test, TestingModule } from '@nestjs/testing';
import { PrpcService } from './prpc.service';

describe('PrpcService', () => {
  let service: PrpcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrpcService],
    }).compile();

    service = module.get<PrpcService>(PrpcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
