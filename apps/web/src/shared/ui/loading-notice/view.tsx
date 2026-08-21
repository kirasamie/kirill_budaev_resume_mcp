import { cn } from '@shared/lib';

import type { LoadingNoticeProps } from './types';

export const LoadingNotice = ({ message, className }: LoadingNoticeProps) => (
  <p
    role="status"
    aria-live="polite"
    className={cn('font-mono text-sm text-content-base-tertiary', className)}
  >
    {message}
  </p>
);
