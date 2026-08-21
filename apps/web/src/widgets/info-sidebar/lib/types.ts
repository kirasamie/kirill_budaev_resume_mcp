import type { ResumePortfolio } from '@portfolio/domain/resume';

export type Skill = ResumePortfolio['skills'][number];

export interface SkillCategoryGroup extends Pick<Skill, 'category'> {
  skills: Skill[];
}
