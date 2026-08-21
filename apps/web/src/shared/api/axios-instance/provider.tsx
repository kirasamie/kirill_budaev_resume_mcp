import { AxiosInstanceContext } from './context';

import type { AxiosProviderProps } from './types';

export const AxiosProvider = ({ instance, children }: AxiosProviderProps) => (
  <AxiosInstanceContext.Provider value={instance}>
    {children}
  </AxiosInstanceContext.Provider>
);
