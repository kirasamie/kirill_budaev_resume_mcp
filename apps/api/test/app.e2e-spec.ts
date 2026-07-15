import { describe, it, expect, afterEach, beforeEach } from '@jest/globals';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import type { INestApplication } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import type { App } from 'supertest/types';

import { APP_VERSION } from '@portfolio/common';

import { AppModule } from '../src/app.module';
import { McpAcceptHeader } from '../src/mcp/constants';

describe('HealthController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/health (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/health').expect(200);

    expect(response.body).toEqual({
      ok: true,
      version: APP_VERSION,
      mcp: './mcp',
    });
  });
});

describe('McpController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/mcp (POST) initialize', async () => {
    const response = await request(app.getHttpServer())
      .post('/mcp')
      .set('Accept', McpAcceptHeader)
      .send({
        jsonrpc: '2.0',
        id: 1,
        method: 'initialize',
        params: {
          protocolVersion: '2024-11-05',
          capabilities: {},
          clientInfo: { name: 'test', version: '1.0.0' },
        },
      })
      .expect(200);

    expect(response.body.result.serverInfo).toEqual({
      name: 'portfolio-mcp',
      version: APP_VERSION,
    });
  });
});
