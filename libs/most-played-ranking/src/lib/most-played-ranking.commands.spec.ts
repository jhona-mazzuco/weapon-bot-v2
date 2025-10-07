import { Test, TestingModule } from '@nestjs/testing';
import { MostPlayedRankingCommands } from './most-played-ranking.commands';

describe('MostPlayedRankingCommands', () => {
  let service: MostPlayedRankingCommands;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MostPlayedRankingCommands],
    }).compile();

    service = module.get<MostPlayedRankingCommands>(MostPlayedRankingCommands);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
