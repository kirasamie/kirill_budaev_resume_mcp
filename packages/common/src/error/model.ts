/** Typed error with a stable machine-readable code. */
export class TaggedError<TCode extends string> extends Error {
  readonly code: TCode;
  override readonly cause?: unknown;

  constructor(code: TCode, message?: string, cause?: unknown) {
    super(message);
    this.code = code;
    this.name = `TaggedError: ${code}`;
    this.cause = cause;
  }
}
