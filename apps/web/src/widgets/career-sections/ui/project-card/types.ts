import type { ResumePortfolio } from '@portfolio/domain/resume';

export interface ProjectCardProps {
  project: ResumePortfolio['projects'][number];
}
