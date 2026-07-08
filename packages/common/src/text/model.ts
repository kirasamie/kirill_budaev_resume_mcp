const normalizeText = (value: string) => value.trim().toLowerCase();

export const containsNormalized = (haystack: string, needle: string) =>
  normalizeText(haystack).includes(normalizeText(needle));

export const containsNormalizedIn = (
  values: readonly string[],
  query: string,
) => values.some((value) => containsNormalized(value, query));
