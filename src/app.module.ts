import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IntentsBitField } from 'discord.js';
import { NecordModule } from 'necord';
import * as process from 'node:process';
import { AppService } from './app.service';
import { COMMANDS } from './commands';
import { SERVICES } from './services';

@Module({
  imports: [
    ConfigModule.forRoot(),
    NecordModule.forRoot({
      token: process.env.DISCORD_TOKEN,
      intents: [IntentsBitField.Flags.Guilds],
    }),
  ],
  providers: [AppService, ...COMMANDS, ...SERVICES],
})
export class AppModule {}
