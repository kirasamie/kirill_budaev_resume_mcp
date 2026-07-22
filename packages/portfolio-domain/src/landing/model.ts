import { z } from 'zod';

import { ProfileSchema } from '../schemas';

export const LandingPortfolioSchema = z.object({
  profile: ProfileSchema,
  contact: z.object({
    email: z.string().email(),
    telegram: z.string().url(),
  }),
});
