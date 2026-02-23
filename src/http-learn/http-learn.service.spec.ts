import { Test, TestingModule } from '@nestjs/testing';
import { HttpLearnService } from './http-learn.service';

describe('HttpLearnService', () => {
  let service: HttpLearnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpLearnService],
    }).compile();

    service = module.get<HttpLearnService>(HttpLearnService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to say hello', () => {
    const response = service.sayHello('John', 123);
    expect(response).toBe('Hello John with ID 123');
  });
});
