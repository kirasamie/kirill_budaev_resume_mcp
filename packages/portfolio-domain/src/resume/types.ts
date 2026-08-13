import type { ResumePortfolioSchema } from './model';
import type { z } from 'zod';

export type ResumePortfolio = z.infer<typeof ResumePortfolioSchema>;

export type ResumeContact = ResumePortfolio['contact'];
