import { Module } from '@nestjs/common';

import { HealthModule } from './health';
import { PortfolioModule } from './portfolio';
import { ToolsModule } from './tools';

@Module({
  imports: [HealthModule, PortfolioModule, ToolsModule],
})
export class AppModule {}
