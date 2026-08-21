import { cn } from '@shared/lib';

import type { SectionProps } from './types';

export const Section = ({
  id,
  title,
  description,
  children,
  className,
}: SectionProps) => (
  <section id={id} className={cn('py-12', className)}>
    <div className="mb-6">
      <h2 className="text-2xl font-semibold tracking-tight text-content-base-primary">
        {title}
      </h2>
      {description && (
        <p className="mt-2 text-content-base-tertiary">{description}</p>
      )}
    </div>
    {children}
  </section>
);
