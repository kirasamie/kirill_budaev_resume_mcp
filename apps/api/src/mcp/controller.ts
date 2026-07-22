import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { Controller, Post, Req, Res } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import type { Request, Response } from 'express';

import { McpConfig, McpService } from './services';
import { THROTTLER_LIMITS } from '../shared/constants';

@Throttle({ default: THROTTLER_LIMITS.HARD })
@Controller('mcp')
export class McpController {
  constructor(
    private readonly mcpService: McpService,
    private readonly mcpConfig: McpConfig,
  ) {}

  @Post()
  async handle(@Req() req: Request, @Res() res: Response) {
    const server = this.mcpService.createServer();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
      enableDnsRebindingProtection: true,
      allowedHosts: this.mcpConfig.allowedHosts,
      allowedOrigins: this.mcpConfig.allowedOrigins,
    });

    res.on('close', () => {
      transport.close();
      server.close();
    });

    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  }
}
