import type { EnumValue } from '@portfolio/common';

export const ErrorCode = {
  AxiosProvider: 'AXIOS_PROVIDER',
  ResumeFetch: 'RESUME_FETCH',
} as const;

export type ErrorCode = EnumValue<typeof ErrorCode>;
