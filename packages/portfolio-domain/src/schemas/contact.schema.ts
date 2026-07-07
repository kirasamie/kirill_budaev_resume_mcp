import { z } from 'zod';

import { enumValues, PreferredContactMethod } from './constants';

export const ContactSchema = z.object({
  email: z.string().email(),
  phone: z.string(),
  telegram: z.string().url(),
  preferredContact: z.enum(enumValues(PreferredContactMethod)),
  messengers: z.array(z.string()).optional(),
});

export type Contact = z.infer<typeof ContactSchema>;
