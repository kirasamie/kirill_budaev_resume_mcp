import type { ResumePortfolio } from '@portfolio/domain/resume';

export type CareerSectionsProps = Pick<
  ResumePortfolio,
  'profile' | 'experience' | 'projects' | 'education' | 'certifications'
>;
