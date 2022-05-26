import { Test, TestingModule } from '@nestjs/testing';
import { HallplanesService } from './hallplanes.service';

describe('HallplanesService', () => {
  let service: HallplanesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HallplanesService],
    }).compile();

    service = module.get<HallplanesService>(HallplanesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
