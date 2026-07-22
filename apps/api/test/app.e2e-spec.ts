import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Test } from '@nestjs/testing';
import { APP_VERSION } from '@portfolio/common';
import request from 'supertest';

import type { INestApplication } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import type { App } from 'supertest/types';

import { AppModule } from '../src/app.module';
import { McpAcceptHeader } from '../src/mcp/constants';
import { ENV_KEYS } from '../src/shared/constants';

const mcpAllowedHosts = 'localhost:3000,127.0.0.1:3000';
const mcpAllowedOrigins = 'http://localhost:3000,http://127.0.0.1:3000';

const mcpInitializePayload = {
  jsonrpc: '2.0',
  id: 1,
  method: 'initialize',
  params: {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'test', version: '1.0.0' },
  },
};

describe('HealthController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    process.env[ENV_KEYS.MCP_ALLOWED_HOSTS] = mcpAllowedHosts;
    process.env[ENV_KEYS.MCP_ALLOWED_ORIGINS] = mcpAllowedOrigins;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('Если сервис запущен, то GET /health возвращает ok и версию', async () => {
    const response = await request(app.getHttpServer())
      .get('/health')
      .expect(200);

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
    process.env[ENV_KEYS.MCP_ALLOWED_HOSTS] = mcpAllowedHosts;
    process.env[ENV_KEYS.MCP_ALLOWED_ORIGINS] = mcpAllowedOrigins;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('Если превышен лимит запросов к MCP, то отвечает 429', async () => {
    process.env[ENV_KEYS.THROTTLE_HARD_LIMIT] = '2';

    const server = app.getHttpServer();

    for (let i = 0; i < 2; i++) {
      await request(server)
        .post('/mcp')
        .set('Host', 'localhost:3000')
        .set('Accept', McpAcceptHeader)
        .send(mcpInitializePayload)
        .expect(200);
    }

    await request(server)
      .post('/mcp')
      .set('Host', 'localhost:3000')
      .set('Accept', McpAcceptHeader)
      .send(mcpInitializePayload)
      .expect(429);

    delete process.env[ENV_KEYS.THROTTLE_HARD_LIMIT];
  });

  it('Если Host разрешён и Origin отсутствует, то initialize возвращает serverInfo', async () => {
    const response = await request(app.getHttpServer())
      .post('/mcp')
      .set('Host', 'localhost:3000')
      .set('Accept', McpAcceptHeader)
      .send(mcpInitializePayload)
      .expect(200);

    expect(response.body.result.serverInfo).toEqual({
      name: 'portfolio-mcp',
      version: APP_VERSION,
    });
  });

  it('Если Host не разрешён, то MCP отвечает 403', async () => {
    await request(app.getHttpServer())
      .post('/mcp')
      .set('Host', 'evil.example')
      .set('Accept', McpAcceptHeader)
      .send(mcpInitializePayload)
      .expect(403);
  });

  it('Если Origin не разрешён, то MCP отвечает 403', async () => {
    await request(app.getHttpServer())
      .post('/mcp')
      .set('Host', 'localhost:3000')
      .set('Origin', 'http://evil.example')
      .set('Accept', McpAcceptHeader)
      .send(mcpInitializePayload)
      .expect(403);
  });
});
