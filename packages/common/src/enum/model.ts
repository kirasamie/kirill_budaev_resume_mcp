import type { EnumValue } from './types';

export const enumValues = <TObject extends Record<string, string>>(
  enumeration: TObject,
): [EnumValue<TObject>, ...EnumValue<TObject>[]] =>
  Object.values(enumeration) as [EnumValue<TObject>, ...EnumValue<TObject>[]];
