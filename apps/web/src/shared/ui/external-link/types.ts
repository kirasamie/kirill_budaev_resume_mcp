import type { PropsWithChildren } from 'react';

import type { ClassNameProps } from '@shared/types';

export interface ExternalLinkProps extends PropsWithChildren<ClassNameProps> {
  href: string;
}
