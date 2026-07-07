import { z } from 'zod';

export const ExperienceLinksSchema = z.object({
  article: z.string().url().optional(),
  uiKit: z.string().url().optional(),
  demo: z.string().url().optional(),
  github: z.string().url().optional(),
});

export const ExperienceSchema = z.object({
  id: z.string(),
  company: z.string(),
  role: z.string(),
  location: z.string().optional(),
  website: z.string().url().optional(),
  industry: z.string().optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}$/),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}$/)
    .nullable(),
  highlights: z.array(z.string()),
  stack: z.array(z.string()),
  links: ExperienceLinksSchema.optional(),
});

export const ExperienceListSchema = z.array(ExperienceSchema);

export type Experience = z.infer<typeof ExperienceSchema>;
