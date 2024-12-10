import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IntentsBitField } from 'discord.js';
import { NecordModule } from 'necord';
import * as process from 'node:process';
import { AppService } from './app.service';
import { FixupCommands } from './commands/fixup/fixup.commands';
import { KakarocoCommands } from './commands/kakaroco/kakaroco.commands';
import { MostPlayedRankingCommands } from './commands/most-played-ranking/most-played-ranking-commands.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    NecordModule.forRoot({
      token: process.env.DISCORD_TOKEN,
      intents: [IntentsBitField.Flags.Guilds],
    }),
  ],
  providers: [
    AppService,
    MostPlayedRankingCommands,
    KakarocoCommands,
    FixupCommands,
  ],
})
export class AppModule {}
