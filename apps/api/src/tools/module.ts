import { Module } from '@nestjs/common';

import { PortfolioModule } from '../portfolio';
import { ToolsService } from './service';

@Module({
  imports: [PortfolioModule],
  providers: [ToolsService],
  exports: [ToolsService],
})
export class ToolsModule {}
