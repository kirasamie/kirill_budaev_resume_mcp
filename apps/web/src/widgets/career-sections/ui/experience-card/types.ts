import type { ResumePortfolio } from '@portfolio/domain/resume';

export interface ExperienceCardProps {
  item: ResumePortfolio['experience'][number];
}
