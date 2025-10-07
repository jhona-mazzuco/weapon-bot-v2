import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IntentsBitField } from 'discord.js';
import { NecordModule } from 'necord';
import * as process from 'node:process';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { MetacriticModule } from '@refugiogamer/metacritic';
import { FixupModule } from '@refugiogamer/fixup';
import { MostPlayedRankingModule } from '@refugiogamer/most-played-ranking';
import { MemeModule } from '@refugiogamer/meme';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.register({ timeout: 5000 }),
    NecordModule.forRoot({
      token: process.env.DISCORD_TOKEN,
      intents: [IntentsBitField.Flags.Guilds],
    }),
    FixupModule,
    MemeModule,
    MetacriticModule,
    MostPlayedRankingModule,
  ],
  providers: [AppService],
})
export class AppModule {}
