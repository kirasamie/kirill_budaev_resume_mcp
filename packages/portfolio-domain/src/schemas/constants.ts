import { enumValues, type EnumValue } from '@portfolio/common';

export const SkillCategory = {
  Frontend: 'frontend',
  Backend: 'backend',
  Testing: 'testing',
  Architecture: 'architecture',
  Devops: 'devops',
} as const;

export type SkillCategory = EnumValue<typeof SkillCategory>;

export const SkillLevel = {
  Beginner: 'beginner',
  Intermediate: 'intermediate',
  Advanced: 'advanced',
  Expert: 'expert',
} as const;

export type SkillLevel = EnumValue<typeof SkillLevel>;

export const ProjectStatus = {
  Active: 'active',
  Completed: 'completed',
  InProgress: 'in_progress',
} as const;

export type ProjectStatus = EnumValue<typeof ProjectStatus>;

export const WorkFormat = {
  Remote: 'remote',
  Hybrid: 'hybrid',
  Onsite: 'onsite',
} as const;

export type WorkFormat = EnumValue<typeof WorkFormat>;

export const Availability = {
  Open: 'open',
  NotLooking: 'not_looking',
  Freelance: 'freelance',
} as const;

export type Availability = EnumValue<typeof Availability>;

export const LanguageLevel = {
  Native: 'native',
  A1: 'A1',
  A2: 'A2',
  B1: 'B1',
  B2: 'B2',
  C1: 'C1',
  C2: 'C2',
} as const;

export type LanguageLevel = EnumValue<typeof LanguageLevel>;

export const PreferredContactMethod = {
  Email: 'email',
  Phone: 'phone',
  Telegram: 'telegram',
} as const;

export type PreferredContactMethod = EnumValue<typeof PreferredContactMethod>;

export const EducationLevel = {
  Higher: 'higher',
  Secondary: 'secondary',
  Course: 'course',
} as const;

export type EducationLevel = EnumValue<typeof EducationLevel>;

export { enumValues };
