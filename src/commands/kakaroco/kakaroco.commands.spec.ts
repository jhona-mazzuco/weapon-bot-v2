import { Test, TestingModule } from '@nestjs/testing';
import { KakarocoCommands } from './kakaroco.commands';

describe('KonservarocoService', () => {
  let service: KakarocoCommands;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KakarocoCommands],
    }).compile();

    service = module.get<KakarocoCommands>(KakarocoCommands);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
