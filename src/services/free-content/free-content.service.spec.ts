import { Test, TestingModule } from '@nestjs/testing';
import { FreeContentService } from './free-content.service';

describe('FreeContentService', () => {
  let service: FreeContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FreeContentService],
    }).compile();

    service = module.get<FreeContentService>(FreeContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
