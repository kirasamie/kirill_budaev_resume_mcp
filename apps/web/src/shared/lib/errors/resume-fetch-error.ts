import { TaggedError } from '@portfolio/common';

import { ErrorCode } from './constants';

export class ResumeFetchError extends TaggedError<
  typeof ErrorCode.ResumeFetch
> {
  constructor(message: string, cause?: unknown) {
    super(ErrorCode.ResumeFetch, message, cause);
  }
}
