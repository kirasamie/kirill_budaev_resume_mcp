import type { ConfigService } from '@nestjs/config';

export const readRequiredList = (config: ConfigService, name: string) => {
  const value = config.getOrThrow<string>(name);
  const items = value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  if (!items.length) {
    throw new Error(`${name} must contain at least one value`);
  }
  return items;
};
