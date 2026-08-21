import type { ResumePortfolio } from '@portfolio/domain/resume';

export interface CertificationCardProps {
  item: ResumePortfolio['certifications'][number];
}
