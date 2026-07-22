import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { MCP } from '../constants';
import { readRequiredList } from '../lib';

@Injectable()
export class McpConfig {
  readonly allowedHosts: string[];
  readonly allowedOrigins: string[];

  constructor(config: ConfigService) {
    this.allowedHosts = readRequiredList(config, MCP.ALLOWED_HOSTS);
    this.allowedOrigins = readRequiredList(config, MCP.ALLOWED_ORIGINS);
  }
}
