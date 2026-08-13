import type { ElementType } from 'react';

import type { ClassNameProps } from '@shared/types';

export type ConsoleMarkerVariant = 'comment' | 'prompt' | 'plain';

export interface ConsoleMarkerProps extends ClassNameProps {
  variant?: ConsoleMarkerVariant;
  /** Label without chrome prefix (`contact` → `// contact`) */
  label: string;
  as?: ElementType;
}
