import type { PortfolioAssetsRaw } from '../assets';

export interface PortfolioRaw extends PortfolioAssetsRaw {
  resumeMarkdown: string;
}
