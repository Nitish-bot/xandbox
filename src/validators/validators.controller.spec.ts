import { Test, TestingModule } from '@nestjs/testing';
import { ValidatorsController } from './validators.controller';
import { ValidatorsService } from './validators.service';

describe('ValidatorsController', () => {
  let controller: ValidatorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValidatorsController],
      providers: [ValidatorsService],
    }).compile();

    controller = module.get<ValidatorsController>(ValidatorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
