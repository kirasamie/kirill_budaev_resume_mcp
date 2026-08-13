import type { PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { resumeRaw } from '@portfolio/data/resume';

import {
  AxiosProvider,
  createAxiosInstance,
  createMockApiAdapter,
  createQueryClient,
  Endpoints,
} from '@shared/api';

const queryClient = createQueryClient();

const axiosInstance = createAxiosInstance({
  adapter: createMockApiAdapter({
    [Endpoints.Resume]: resumeRaw,
  }),
});

export const AppProviders = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    <AxiosProvider instance={axiosInstance}>{children}</AxiosProvider>
  </QueryClientProvider>
);
