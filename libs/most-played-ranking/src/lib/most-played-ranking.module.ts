import { Module } from '@nestjs/common';
import { MostPlayedRankingService } from './most-played-ranking.service';
import { MostPlayedRankingCommands } from './most-played-ranking.commands';
import { HttpModule } from '@nestjs/axios';

const providers = [MostPlayedRankingService, MostPlayedRankingCommands];

@Module({
  imports: [HttpModule],
  providers: [...providers],
  exports: [...providers],
})
export class MostPlayedRankingModule {}
