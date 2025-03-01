import { Test, TestingModule } from '@nestjs/testing';
import { MetacriticCommands } from './metacritic.commands';

describe('MetacriticCommands', () => {
  let controller: MetacriticCommands;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetacriticCommands],
    }).compile();

    controller = module.get<MetacriticCommands>(MetacriticCommands);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
