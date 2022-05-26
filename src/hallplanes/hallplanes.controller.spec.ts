import { Test, TestingModule } from '@nestjs/testing';
import { HallplanesController } from './hallplanes.controller';
import { HallplanesService } from './hallplanes.service';

describe('HallplanesController', () => {
  let controller: HallplanesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HallplanesController],
      providers: [HallplanesService],
    }).compile();

    controller = module.get<HallplanesController>(HallplanesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
