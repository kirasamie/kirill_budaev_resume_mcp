/**
 * Returns `value` when it is not `false`, `null`, or `undefined`.
 * Does not treat `0` / `''` as empty.
 */
export const getOrUndefined = <TValue>(
  value: TValue | false | null | undefined,
): TValue | undefined => {
  if (value === false || value == null) {
    return undefined;
  }

  return value;
};
