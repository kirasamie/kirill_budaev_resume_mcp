import { getOrNull } from '@shared/lib';

import type { LinkItem, LinkSource } from './types';

export const toLinkItems = (links?: LinkSource): LinkItem[] => {
  if (!links) {
    return [];
  }

  return [
    getOrNull(links.article && { href: links.article, label: 'статья' }),
    getOrNull(links.uiKit && { href: links.uiKit, label: 'ui_kit' }),
    getOrNull(links.demo && { href: links.demo, label: 'демо' }),
    getOrNull(links.github && { href: links.github, label: 'github' }),
  ].filter((item): item is LinkItem => item !== null);
};
