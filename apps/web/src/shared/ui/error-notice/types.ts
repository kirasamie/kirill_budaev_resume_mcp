import type { ClassNameProps } from '@shared/types';

export interface ErrorNoticeProps extends ClassNameProps {
  message: string;
  retryLabel?: string;
  isRetrying?: boolean;
  onRetry?: () => void | Promise<void>;
}
