import type { ResumePortfolio } from '@portfolio/domain/resume';

export type CareerHeaderProps = Pick<
  ResumePortfolio['profile'],
  'name' | 'title' | 'summary'
>;
