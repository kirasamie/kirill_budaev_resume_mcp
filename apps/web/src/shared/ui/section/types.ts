import type { PropsWithChildren } from 'react';

import type { ClassNameProps } from '@shared/types';

export interface SectionProps extends PropsWithChildren<ClassNameProps> {
  id?: string;
  title: string;
  description?: string;
}
