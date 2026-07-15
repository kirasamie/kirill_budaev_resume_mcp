import { cn } from '@shared/lib';

import type { ContainerProps } from './types';

export const Container = ({ children, className }: ContainerProps) => (
  <div className={cn('mx-auto w-full max-w-3xl px-6', className)}>
    {children}
  </div>
);
