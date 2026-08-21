import type { ResumePortfolio } from '@portfolio/domain/resume';

import type { Skill, SkillCategoryGroup } from './types';

export const groupSkillsByCategory = (
  skills: ResumePortfolio['skills'],
): SkillCategoryGroup[] => {
  const grouped = skills.reduce(
    (acc, skill) => {
      const current = acc.get(skill.category) ?? [];
      current.push(skill);
      acc.set(skill.category, current);
      return acc;
    },
    new Map<Skill['category'], Skill[]>(),
  );

  return Array.from(grouped, ([category, groupedSkills]) => ({
    category,
    skills: groupedSkills,
  }));
};
