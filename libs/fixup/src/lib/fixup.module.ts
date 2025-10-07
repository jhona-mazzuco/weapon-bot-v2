import { Module } from '@nestjs/common';
import { FixupCommands } from './fixup.commands';

@Module({
  providers: [FixupCommands],
  exports: [FixupCommands],
})
export class FixupModule {}
