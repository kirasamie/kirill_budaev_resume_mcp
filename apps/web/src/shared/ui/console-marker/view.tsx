import { cn } from '@shared/lib';

import type { ConsoleMarkerProps, ConsoleMarkerVariant } from './types';

const formatLabel = (variant: ConsoleMarkerVariant, label: string): string => {
  const commentTitle = `// ${label}`;
  const promptTitle = `$ ${label}`;

  if (variant === 'comment') {
    return commentTitle;
  }

  if (variant === 'prompt') {
    return promptTitle;
  }

  return label;
};

export const ConsoleMarker = ({
  variant = 'comment',
  label,
  as: Tag = 'span',
  className,
}: ConsoleMarkerProps) => {
  const text = formatLabel(variant, label);

  return (
    <Tag
      className={cn(
        'font-mono text-sm tracking-wide text-content-info-inverse-on',
        className,
      )}
    >
      {text}
    </Tag>
  );
};
