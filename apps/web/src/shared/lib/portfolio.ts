import certifications from '@portfolio-data/assets/certifications.json';
import contact from '@portfolio-data/assets/contact.json';
import education from '@portfolio-data/assets/education.json';
import experience from '@portfolio-data/assets/experience.json';
import profile from '@portfolio-data/assets/profile.json';
import projects from '@portfolio-data/assets/projects.json';
import skills from '@portfolio-data/assets/skills.json';
import resumeMarkdown from '@portfolio-data/assets/resume.md?raw';

import { PortfolioSchema, type Portfolio } from '@portfolio/domain/schemas';

const portfolio: Portfolio = PortfolioSchema.parse({
  profile,
  contact,
  experience,
  projects,
  skills,
  education,
  certifications,
  resumeMarkdown,
});

export const getPortfolio = (): Portfolio => portfolio;
