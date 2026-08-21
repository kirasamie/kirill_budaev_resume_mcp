import { cn } from '@shared/lib';

import { LoadingNotice } from '../loading-notice';

import type { SuspenseLoadingProps } from './types';

export const SuspenseLoading = ({
  message,
  className,
}: SuspenseLoadingProps) => (
  <div className={cn('mx-auto w-full max-w-5xl px-6 py-10', className)}>
    <LoadingNotice message={message} />
  </div>
);
