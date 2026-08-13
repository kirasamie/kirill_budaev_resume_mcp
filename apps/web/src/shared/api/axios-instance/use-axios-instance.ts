import { use } from 'react';

import { AxiosProviderError } from '@shared/lib';

import { AxiosInstanceContext } from './context';

export const useAxiosInstance = () => {
  const instance = use(AxiosInstanceContext);

  if (!instance) {
    throw new AxiosProviderError(
      'useAxiosInstance must be used within AxiosProvider',
    );
  }

  return instance;
};
