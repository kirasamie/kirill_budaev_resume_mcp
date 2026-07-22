import { landingRaw } from '@portfolio/data/landing';
import {
  LandingPortfolioSchema,
  type LandingPortfolio,
} from '@portfolio/domain/landing';

const portfolio: LandingPortfolio = LandingPortfolioSchema.parse(landingRaw);

export const getPortfolio = (): LandingPortfolio => portfolio;
