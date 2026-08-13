import type { ResumePortfolio } from '@portfolio/domain/resume';

export type InfoSidebarProps = Pick<
  ResumePortfolio,
  'profile' | 'contact' | 'skills'
>;
