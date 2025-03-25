import { MemeService } from './meme/meme.service';
import { FreeContentService } from './free-content/free-content.service';
import { MetacriticService } from './metacritic/metacritic.service';
import { MostPlayedRankingService } from './most-played-ranking/most-played-ranking.service';

export const SERVICES = [
  MemeService,
  FreeContentService,
  MetacriticService,
  MostPlayedRankingService,
];
