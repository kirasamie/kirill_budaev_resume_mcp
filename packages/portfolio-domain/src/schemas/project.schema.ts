import { z } from 'zod';

import { ProjectStatusSchema } from './shared.schema';

export const ProjectLinksSchema = z.object({
  github: z.string().url().optional(),
  demo: z.string().url().optional(),
  article: z.string().url().optional(),
  uiKit: z.string().url().optional(),
});

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  company: z.string(),
  summary: z.string(),
  role: z.string(),
  stack: z.array(z.string()),
  highlights: z.array(z.string()),
  links: ProjectLinksSchema.optional(),
  status: ProjectStatusSchema,
});

export const ProjectListSchema = z.array(ProjectSchema);

export type Project = z.infer<typeof ProjectSchema>;

export const ListProjectsInputSchema = z.object({
  tech: z.string().optional(),
  status: ProjectStatusSchema.optional(),
});

export type ListProjectsInput = z.infer<typeof ListProjectsInputSchema>;

export const GetProjectDetailsInputSchema = z.object({
  name: z.string().min(1).max(100).trim(),
});

export type GetProjectDetailsInput = z.infer<
  typeof GetProjectDetailsInputSchema
>;
