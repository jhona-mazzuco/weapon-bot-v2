import { Test, TestingModule } from '@nestjs/testing';
import { MemeCommands } from './meme.commands';

describe('MemeCommands', () => {
  let service: MemeCommands;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemeCommands],
    }).compile();

    service = module.get<MemeCommands>(MemeCommands);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
