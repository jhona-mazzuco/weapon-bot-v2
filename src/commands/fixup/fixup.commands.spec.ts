import { Test, TestingModule } from '@nestjs/testing';
import { FixupCommands } from './fixup.commands';

describe('FixupCommands', () => {
  let service: FixupCommands;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FixupCommands],
    }).compile();

    service = module.get<FixupCommands>(FixupCommands);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
