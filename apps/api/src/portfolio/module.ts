import { Module } from '@nestjs/common';

import { PortfolioService } from './service';

@Module({
  providers: [PortfolioService],
  exports: [PortfolioService],
})
export class PortfolioModule {}
