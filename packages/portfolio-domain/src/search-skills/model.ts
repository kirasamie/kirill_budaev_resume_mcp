import { containsNormalized, containsNormalizedIn } from '@portfolio/common';

import type { Portfolio } from '../load-portfolio';
import type { SearchSkillsInput } from '../schemas';

import { SearchSkillsInputSchema } from '../schemas';

export const searchSkills = (
  portfolio: Portfolio,
  input: SearchSkillsInput,
) => {
  const { query, category } = SearchSkillsInputSchema.parse(input);

  return portfolio.skills.filter((skill) => {
    const matchesQuery =
      containsNormalized(skill.name, query) ||
      containsNormalizedIn(skill.aliases ?? [], query);
    const matchesCategory = category == null || skill.category === category;

    return matchesQuery && matchesCategory;
  });
};
