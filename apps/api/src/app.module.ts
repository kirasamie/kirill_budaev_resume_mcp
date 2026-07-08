import { Module } from '@nestjs/common';

import { PortfolioModule } from './portfolio';
import { ToolsModule } from './tools';

@Module({
  imports: [PortfolioModule, ToolsModule],
})
export class AppModule {}
