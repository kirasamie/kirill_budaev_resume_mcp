import { z } from 'zod';

import { EducationLevel, enumValues } from './constants';

export const EducationSchema = z.object({
  institution: z.string(),
  city: z.string().optional(),
  degree: z.string(),
  field: z.string().optional(),
  year: z.number().int(),
  level: z.enum(enumValues(EducationLevel)).optional(),
});

export const EducationListSchema = z.array(EducationSchema);

export type Education = z.infer<typeof EducationSchema>;
