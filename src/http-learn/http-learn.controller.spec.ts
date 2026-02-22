import { Test, TestingModule } from '@nestjs/testing';
import { HttpLearnController } from './http-learn.controller';
import { Request } from 'express';
import httpMock from 'node-mocks-http';

describe('HttpLearnController', () => {
  let controller: HttpLearnController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HttpLearnController],
    }).compile();

    controller = module.get<HttpLearnController>(HttpLearnController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return query, param, header, body', () => {
    const reqMock = httpMock.createRequest({
      query: { query: 'test-query' },
      params: { id: '123' },
      headers: { header: 'test-header' },
      body: { message: 'hello' },
    });

    const response = controller.request(reqMock as Request);

    expect(response.query).toBe('This is query test-query');
    expect(response.param).toBe('This is param 123');
    expect(response.header).toBe('This is header test-header');
    expect(response.body).toBe('This is body {"message":"hello"}');
  });

  it('should access GET endpoint', () => {
    const response = controller.get();
    expect(response).toBe('This is GET endpoint');
  });

  it('should can say hello', async () => {
    const response = await controller.sayHello('John', '10');
    expect(response).toBe('Hello John with ID 10');
  });
});
