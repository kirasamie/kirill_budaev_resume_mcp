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
      <h2 className="text-2xl font-semibold tracking-tight text-white">
        {title}
      </h2>
      {description && <p className="mt-2 text-slate-400">{description}</p>}
    </div>
    {children}
  </section>
);
