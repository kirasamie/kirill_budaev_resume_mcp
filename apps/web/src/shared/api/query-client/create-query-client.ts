import { QueryClient } from '@tanstack/react-query';

import { QUERY_CLIENT_CONFIG } from './constants';

export const createQueryClient = () => new QueryClient(QUERY_CLIENT_CONFIG);
