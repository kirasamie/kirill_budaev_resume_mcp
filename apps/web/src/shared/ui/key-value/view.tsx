import { cn } from '@shared/lib';

import type { KeyValueProps } from './types';

export const KeyValue = ({
  label,
  value,
  children,
  className,
}: KeyValueProps) => {
  const labelText = `${label}:`;

  return (
    <div
      className={cn('flex flex-wrap items-baseline gap-x-2 gap-y-1', className)}
    >
      <span className="font-mono text-sm text-content-base-tertiary">
        {labelText}
      </span>
      <span className="text-content-base-secondary">{children ?? value}</span>
    </div>
  );
};
