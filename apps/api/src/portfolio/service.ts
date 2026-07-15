import { Injectable } from '@nestjs/common';
import { loadPortfolio, type Portfolio } from '@portfolio/domain';

import type { OnModuleInit } from '@nestjs/common';

@Injectable()
export class PortfolioService implements OnModuleInit {
  private portfolio!: Portfolio;

  onModuleInit() {
    this.portfolio = loadPortfolio();
  }

  getPortfolio(): Portfolio {
    return this.portfolio;
  }
}
