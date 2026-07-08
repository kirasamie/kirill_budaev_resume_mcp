import { Module } from '@nestjs/common';

import { HealthModule } from './health';
import { ToolsModule } from './tools';

@Module({
  imports: [HealthModule, ToolsModule],
})
export class AppModule {}
