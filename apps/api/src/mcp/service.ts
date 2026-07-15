import { Injectable } from '@nestjs/common';
import { APP_VERSION } from '@portfolio/common';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { ToolsService } from '../tools';
import { registerMcpHandlers } from './lib';

@Injectable()
export class McpService {
  constructor(private readonly toolsService: ToolsService) {}

  createServer(): McpServer {
    const server = new McpServer({
      name: 'portfolio-mcp',
      version: APP_VERSION,
    });

    registerMcpHandlers(server, this.toolsService);

    return server;
  }
}
