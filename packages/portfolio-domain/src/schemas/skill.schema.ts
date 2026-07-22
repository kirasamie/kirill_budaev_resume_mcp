import { z } from 'zod';

import { SkillCategorySchema, SkillLevelSchema } from './shared.schema';

export const SkillSchema = z.object({
  name: z.string(),
  category: SkillCategorySchema,
  level: SkillLevelSchema,
  aliases: z.array(z.string()).optional(),
});

export const SkillListSchema = z.array(SkillSchema);

export type Skill = z.infer<typeof SkillSchema>;

export const SearchSkillsInputSchema = z.object({
  query: z.string().min(1).max(100).trim(),
  category: SkillCategorySchema.optional(),
});

export type SearchSkillsInput = z.infer<typeof SearchSkillsInputSchema>;
