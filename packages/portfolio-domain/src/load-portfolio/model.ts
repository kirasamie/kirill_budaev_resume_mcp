import { loadPortfolioRaw } from '@portfolio/data';

import type { Portfolio } from './types';

import { PortfolioSchema } from '../schemas';

export const loadPortfolio = (): Portfolio =>
  PortfolioSchema.parse(loadPortfolioRaw());
