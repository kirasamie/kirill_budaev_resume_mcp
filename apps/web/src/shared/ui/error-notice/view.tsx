import { cn } from '@shared/lib';

import type { ErrorNoticeProps } from './types';

export const ErrorNotice = ({
  message,
  retryLabel,
  isRetrying = false,
  onRetry,
  className,
}: ErrorNoticeProps) => (
  <div role="alert" className={cn('space-y-4', className)}>
    <p className="font-mono text-sm text-content-base-tertiary">{message}</p>
    {onRetry && retryLabel && (
      <button
        type="button"
        onClick={onRetry}
        disabled={isRetrying}
        aria-busy={isRetrying}
        className="font-mono text-sm text-content-accent-default transition hover:text-content-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {retryLabel}
      </button>
    )}
  </div>
);
