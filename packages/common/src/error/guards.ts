import { TaggedError } from './model';

export const isTaggedError = (error: unknown): error is TaggedError<string> =>
  error instanceof TaggedError;

export const isErrorOfType = <TCode extends string>(
  error: unknown,
  code: TCode,
): error is TaggedError<TCode> =>
  error instanceof TaggedError && error.code === code;
