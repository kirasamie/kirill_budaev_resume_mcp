import { z } from 'zod';

import { enumValues, PreferredContactMethod } from './constants';

export const ContactSchema = z.object({
  email: z.string().email(),
  phone: z.string(),
  telegram: z.string().url(),
  preferredContact: z.enum(enumValues(PreferredContactMethod)),
  messengers: z.array(z.string()).optional(),
});

export const PublicContactSchema = ContactSchema.pick({
  email: true,
  telegram: true,
});

export type Contact = z.infer<typeof ContactSchema>;
export type PublicContact = z.infer<typeof PublicContactSchema>;
