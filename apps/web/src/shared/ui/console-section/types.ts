import type { PropsWithChildren } from 'react';

import type { ClassNameProps } from '@shared/types';

export interface ConsoleSectionProps extends PropsWithChildren<ClassNameProps> {
  id?: string;
  /** Marker label without chrome, e.g. `contact` → rendered as `// contact` */
  title: string;
  description?: string;
}
