import { describe, it, expect, afterEach, beforeEach } from '@jest/globals';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import type { INestApplication } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import type { App } from 'supertest/types';

import { APP_VERSION } from '@portfolio/common';

import { AppModule } from '../src/app.module';

describe('HealthController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/health (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/health').expect(200);

    expect(response.body).toEqual({
      ok: true,
      version: APP_VERSION,
      mcp: './mcp',
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
