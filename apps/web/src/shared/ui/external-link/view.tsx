import { cn } from '@shared/lib';

import type { ExternalLinkProps } from './types';

const defaultClassName =
  'text-content-accent-default transition hover:text-content-accent-hover';

export const ExternalLink = ({
  href,
  children,
  className,
}: ExternalLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className={cn(defaultClassName, className)}
  >
    {children}
  </a>
);
