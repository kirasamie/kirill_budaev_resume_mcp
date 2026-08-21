/**
 * Returns `value` when it is not `false`, `null`, or `undefined`.
 * Does not treat `0` / `''` as empty.
 */
export const getOrNull = <TValue>(
  value: TValue | false | null | undefined,
): TValue | null => {
  if (value === false || value == null) {
    return null;
  }

  return value;
};
