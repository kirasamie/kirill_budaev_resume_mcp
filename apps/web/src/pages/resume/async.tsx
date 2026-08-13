import { lazyContent, SuspenseLoading } from '@shared/ui';

const loadingMessage = 'Загрузка резюме…';

export const LazyResumePage = lazyContent(
  () => import('./view'),
  <SuspenseLoading message={loadingMessage} />,
);
