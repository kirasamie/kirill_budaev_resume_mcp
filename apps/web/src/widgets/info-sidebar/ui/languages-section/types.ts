import type { ResumePortfolio } from '@portfolio/domain/resume';

export type LanguagesSectionProps = Pick<
  ResumePortfolio['profile'],
  'languages'
>;
