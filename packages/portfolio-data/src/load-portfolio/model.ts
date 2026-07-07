import type { PortfolioRaw } from './types';

import {
  certifications,
  contact,
  education,
  experience,
  profile,
  projects,
  skills,
} from '../assets';
import { readResumeMarkdown } from '../read-resume';

export const loadPortfolioRaw = (): PortfolioRaw => ({
  profile,
  contact,
  experience,
  projects,
  skills,
  education,
  certifications,
  resumeMarkdown: readResumeMarkdown(),
});
