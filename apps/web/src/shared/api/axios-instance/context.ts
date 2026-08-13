import { createContext } from 'react';
import type { AxiosInstance } from 'axios';

export const AxiosInstanceContext = createContext<AxiosInstance | null>(null);
