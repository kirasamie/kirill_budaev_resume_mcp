import { Module } from '@nestjs/common';

import { HealthModule } from './health';
import { McpModule } from './mcp';
import { StaticModule } from './static';

@Module({
  imports: [HealthModule, McpModule, StaticModule],
})
export class AppModule {}
