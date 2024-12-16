import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IntentsBitField } from 'discord.js';
import { NecordModule } from 'necord';
import * as process from 'node:process';
import { AppService } from './app.service';
import { FixupCommands } from './commands/fixup/fixup.commands';
import { MemeCommands } from './commands/meme/meme.commands';
import { MostPlayedRankingCommands } from './commands/most-played-ranking/most-played-ranking-commands.service';
import { MemeService } from './services/meme/meme.service';

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

    // COMMANDS
    MostPlayedRankingCommands,
    MemeCommands,
    FixupCommands,

    // SERVICES
    MemeService,
  ],
})
export class AppModule {}
