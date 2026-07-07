import { z } from 'zod';

import {
  AvailabilitySchema,
  LanguageLevelSchema,
  WorkFormatSchema,
} from './shared.schema';

export const LanguageSchema = z.object({
  name: z.string(),
  level: LanguageLevelSchema,
});

export const ProfileSchema = z.object({
  name: z.string(),
  title: z.string(),
  summary: z.string(),
  location: z.object({
    city: z.string(),
    country: z.string(),
  }),
  workFormat: z.array(WorkFormatSchema),
  relocation: z.boolean(),
  businessTrips: z.boolean().optional(),
  experienceYears: z.number().positive(),
  languages: z.array(LanguageSchema),
  availability: AvailabilitySchema,
});

export type Profile = z.infer<typeof ProfileSchema>;
