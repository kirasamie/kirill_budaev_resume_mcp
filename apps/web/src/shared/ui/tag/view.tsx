import { cn } from '@shared/lib';

import type { TagProps } from './types';

export const Tag = ({ children, className }: TagProps) => (
  <span
    className={cn(
      'inline-block border border-border-base-main px-2 py-0.5 font-mono text-xs text-content-base-secondary',
      className,
    )}
  >
    {children}
  </span>
);
