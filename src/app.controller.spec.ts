import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';

describe('App', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/GET app`, () => {
    return request(app.getHttpServer())
        .get('')
        .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});