import { ExternalLink } from '@shared/ui';

import type { LinkListProps } from './types';

export const LinkList = ({ items }: LinkListProps) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-4 font-mono text-sm">
      {items.map((link) => (
        <ExternalLink key={link.href} href={link.href}>
          {link.label}
        </ExternalLink>
      ))}
    </div>
  );
};
