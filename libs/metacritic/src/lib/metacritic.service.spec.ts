import { Test, TestingModule } from '@nestjs/testing';
import { MetacriticService } from './metacritic.service';

describe('MetacriticService', () => {
  let service: MetacriticService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetacriticService],
    }).compile();

    service = module.get<MetacriticService>(MetacriticService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
