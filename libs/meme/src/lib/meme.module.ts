import { Module } from '@nestjs/common';
import { MemeService } from './meme.service';
import { MemeCommands } from './meme.commands';

const providers = [MemeCommands, MemeService];

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class MemeModule {}
