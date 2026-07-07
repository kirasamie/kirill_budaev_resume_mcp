import { z } from 'zod';

export const CertificationSchema = z.object({
  name: z.string(),
  year: z.number().int(),
  url: z.string().url().optional(),
});

export const CertificationListSchema = z.array(CertificationSchema);

export type Certification = z.infer<typeof CertificationSchema>;
