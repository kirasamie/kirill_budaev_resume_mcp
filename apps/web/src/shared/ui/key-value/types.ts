import type { PropsWithChildren, ReactNode } from 'react';

import type { ClassNameProps } from '@shared/types';

export interface KeyValueProps extends PropsWithChildren<ClassNameProps> {
  label: string;
  /** Optional value when not using children */
  value?: ReactNode;
}
