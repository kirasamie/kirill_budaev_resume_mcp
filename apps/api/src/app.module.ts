import { Module } from '@nestjs/common';

import { HealthModule } from './health';
import { McpModule } from './mcp';

@Module({
  imports: [HealthModule, McpModule],
})
export class AppModule {}
