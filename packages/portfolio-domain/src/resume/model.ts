import { z } from 'zod';

import {
  CertificationListSchema,
  ContactSchema,
  EducationListSchema,
  ExperienceListSchema,
  ProfileSchema,
  ProjectListSchema,
  SkillListSchema,
} from '../schemas';

export const ResumeContactSchema = ContactSchema.pick({
  email: true,
  phone: true,
  telegram: true,
});

export const ResumePortfolioSchema = z.object({
  profile: ProfileSchema,
  contact: ResumeContactSchema,
  experience: ExperienceListSchema,
  projects: ProjectListSchema,
  skills: SkillListSchema,
  education: EducationListSchema,
  certifications: CertificationListSchema,
});
