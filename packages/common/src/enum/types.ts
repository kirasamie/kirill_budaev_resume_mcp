export type EnumValue<TObject extends Record<string, string>> =
  TObject[keyof TObject];
