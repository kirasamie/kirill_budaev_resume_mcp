import { z } from 'zod';

import { CertificationListSchema } from './certification.schema';
import { ContactSchema } from './contact.schema';
import { EducationListSchema } from './education.schema';
import { ExperienceListSchema } from './experience.schema';
import { ProfileSchema } from './profile.schema';
import { ProjectListSchema } from './project.schema';
import { SkillListSchema } from './skill.schema';

export const PortfolioSchema = z.object({
  profile: ProfileSchema,
  contact: ContactSchema,
  experience: ExperienceListSchema,
  projects: ProjectListSchema,
  skills: SkillListSchema,
  education: EducationListSchema,
  certifications: CertificationListSchema,
  resumeMarkdown: z.string(),
});

export type Portfolio = z.infer<typeof PortfolioSchema>;
