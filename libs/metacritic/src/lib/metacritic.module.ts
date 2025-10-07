import { Module } from '@nestjs/common';
import { MetacriticService } from './metacritic.service';
import { HttpModule } from '@nestjs/axios';
import { MetacriticCommands } from './metacritic.commands';

const providers = [MetacriticCommands, MetacriticService];

@Module({
  imports: [HttpModule],
  providers: [...providers],
  exports: [...providers],
})
export class MetacriticModule {}
