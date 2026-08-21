import type { PropsWithChildren } from 'react';
import type { AxiosInstance } from 'axios';

export interface CreateAxiosInstanceOptions {
  baseURL?: string;
  adapter?: AxiosInstance['defaults']['adapter'];
}

export interface AxiosProviderProps extends PropsWithChildren {
  instance: AxiosInstance;
}
