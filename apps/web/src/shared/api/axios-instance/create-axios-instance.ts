import axios, { type AxiosInstance } from 'axios';

import { getApiBaseUrl } from '@shared/config';

import type { CreateAxiosInstanceOptions } from './types';

export const createAxiosInstance = (
  options: CreateAxiosInstanceOptions = {},
): AxiosInstance =>
  axios.create({
    baseURL: options.baseURL ?? getApiBaseUrl(),
    adapter: options.adapter,
  });
