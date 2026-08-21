import type { ResumePortfolio } from '@portfolio/domain/resume';

export interface EducationCardProps {
  item: ResumePortfolio['education'][number];
}
