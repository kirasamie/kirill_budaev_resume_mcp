import { Module } from '@nestjs/common';

import { ToolsModule } from '../tools';
import { McpController } from './controller';
import { McpService } from './service';

@Module({
  imports: [ToolsModule],
  controllers: [McpController],
  providers: [McpService],
})
export class McpModule {}
