import type { PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import {
  AxiosProvider,
  createAxiosInstance,
  createMockApiAdapter,
  createQueryClient,
} from '@shared/api';

const queryClient = createQueryClient();

const axiosInstance = createAxiosInstance({
  adapter: createMockApiAdapter(),
});

export const AppProviders = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    <AxiosProvider instance={axiosInstance}>{children}</AxiosProvider>
  </QueryClientProvider>
);
