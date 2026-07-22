import type { LandingPortfolioSchema } from './model';
import type { z } from 'zod';

export type LandingPortfolio = z.infer<typeof LandingPortfolioSchema>;

export type PublicContact = LandingPortfolio['contact'];

export type { Profile } from '../schemas';
