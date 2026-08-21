import {
  lazy,
  Suspense,
  type ComponentType,
  type ReactNode,
} from 'react';

import { SuspenseLoading } from '../suspense-loading';

import type { LazyContentLoad } from './types';

const defaultFallbackMessage = 'Загрузка…';

export const lazyContent = <TProps extends object = object>(
  load: LazyContentLoad,
  fallbackContent?: ReactNode,
): ComponentType<TProps> => {
  const LazyComponent = lazy(load);

  const LazyContent = (props: TProps) => (
    <Suspense
      fallback={
        fallbackContent ?? (
          <SuspenseLoading message={defaultFallbackMessage} />
        )
      }
    >
      <LazyComponent {...props} />
    </Suspense>
  );

  return LazyContent;
};
