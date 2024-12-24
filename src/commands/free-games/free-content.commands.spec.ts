import { Test, TestingModule } from '@nestjs/testing';
import { FreeContentCommands } from './free-content.commands';

describe('FreeContentCommands', () => {
  let service: FreeContentCommands;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FreeContentCommands],
    }).compile();

    service = module.get<FreeContentCommands>(FreeContentCommands);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
