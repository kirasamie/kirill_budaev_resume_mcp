import { TaggedError } from '@portfolio/common';

import { ErrorCode } from './constants';

export class AxiosProviderError extends TaggedError<
  typeof ErrorCode.AxiosProvider
> {
  constructor(message: string) {
    super(ErrorCode.AxiosProvider, message);
  }
}
