import { Injectable } from '@nestjs/common';
import { APP_VERSION } from '@portfolio/common';

import { HealthResponse } from './types';

@Injectable()
export class HealthService {
  getHealth(): HealthResponse {
    return {
      ok: true,
      version: APP_VERSION,
      mcp: './mcp',
    };
  }
}
