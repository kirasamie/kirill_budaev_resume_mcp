import { cn } from '@shared/lib';

import { ConsoleMarker } from '../console-marker';

import type { ConsoleSectionProps } from './types';

export const ConsoleSection = ({
  id,
  title,
  description,
  children,
  className,
}: ConsoleSectionProps) => (
  <section id={id} className={cn('py-12', className)}>
    <div className="mb-6">
      <ConsoleMarker as="h2" variant="comment" label={title} />
      {description && (
        <p className="mt-2 text-content-base-tertiary">{description}</p>
      )}
    </div>
    {children}
  </section>
);
