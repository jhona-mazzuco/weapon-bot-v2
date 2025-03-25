import { Test, TestingModule } from '@nestjs/testing';
import { MostPlayedRankingService } from './most-played-ranking.service';

describe('MostPlayedRankingService', () => {
  let service: MostPlayedRankingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MostPlayedRankingService],
    }).compile();

    service = module.get<MostPlayedRankingService>(MostPlayedRankingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
