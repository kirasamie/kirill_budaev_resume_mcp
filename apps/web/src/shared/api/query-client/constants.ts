import type { QueryClientConfig } from '@tanstack/react-query';

export const QUERY_CLIENT_CONFIG = {
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
} satisfies QueryClientConfig;
