import type { ResumePortfolio } from '@portfolio/domain/resume';

export type WhoamiBlockProps = Pick<
  ResumePortfolio['profile'],
  'title' | 'location'
>;
