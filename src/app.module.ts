import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IntentsBitField } from 'discord.js';
import { NecordModule } from 'necord';
import * as process from 'node:process';
import { AppService } from './app.service';
import { COMMANDS } from './commands';
import { SERVICES } from './services';
import { MetacriticCommands } from './commands/metacritic/metacritic.commands';
import { HttpModule } from '@nestjs/axios';
import { MetacriticService } from './services/metacritic/metacritic.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.register({ timeout: 5000 }),
    NecordModule.forRoot({
      token: process.env.DISCORD_TOKEN,
      intents: [IntentsBitField.Flags.Guilds],
    }),
  ],
  providers: [AppService, ...COMMANDS, ...SERVICES, MetacriticService],
  controllers: [MetacriticCommands],
})
export class AppModule {}
