import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Get /users/ retornar un array de usuarios)', async () => {
    
    const req = await request(app.getHttpServer()).get('/users')
      console.log(req.body);
      
      expect(req.status).toBe(200)
      expect(req.body).toBeInstanceOf(Array)
  });
  it('Get /users/:id retornar un array de usuarios)', async () => {
    const req = await request(app.getHttpServer()).get('/users/id');
    console.log(req.body);

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Object);
  });
  it('Get /users/:id no retornar el usuario porque no lo encuentra)', async () => {
    const req = await request(app.getHttpServer()).get('/users/:id');
    console.log(req.body);

    expect(req.status).toBe(404);
    expect(req.body.message).toBe('usuario no encontrado');
  });
});
