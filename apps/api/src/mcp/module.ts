import { Module } from '@nestjs/common';

import { ToolsModule } from '../tools';
import { McpController } from './controller';
import { McpConfig, McpService } from './services';

@Module({
  imports: [ToolsModule],
  controllers: [McpController],
  providers: [McpService, McpConfig],
})
export class McpModule {}
