import { Test, TestingModule } from '@nestjs/testing';
import { EntrantsService } from './entrants.service';

describe('EntrantsService', () => {
  let service: EntrantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntrantsService],
    }).compile();

    service = module.get<EntrantsService>(EntrantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
