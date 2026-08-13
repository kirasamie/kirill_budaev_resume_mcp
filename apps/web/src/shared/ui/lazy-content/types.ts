import type { ComponentType } from 'react';

export type LazyContentLoad = () => Promise<{
  default: ComponentType<object>;
}>;
