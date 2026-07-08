import { Module } from '@nestjs/common';

import { HealthModule } from './health';
import { PortfolioModule } from './portfolio';

@Module({
  imports: [HealthModule, PortfolioModule],
})
export class AppModule {}
