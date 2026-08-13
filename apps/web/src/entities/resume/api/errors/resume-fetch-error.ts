import { TaggedError } from '@portfolio/common';

import { ResumeErrorCode } from './constants';

export class ResumeFetchError extends TaggedError<
  typeof ResumeErrorCode.ResumeFetch
> {
  constructor(message: string, cause?: unknown) {
    super(ResumeErrorCode.ResumeFetch, message, cause);
  }
}
