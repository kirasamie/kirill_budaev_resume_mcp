import { describe, expect, it } from '@jest/globals';
import { ConfigService } from '@nestjs/config';

import { readRequiredList } from './read-required-list';

const createConfig = (values: Record<string, string | undefined>) =>
  ({
    getOrThrow: (name: string) => {
      const value = values[name];
      if (value === undefined) {
        throw new Error(`Configuration key "${name}" does not exist`);
      }
      return value;
    },
  }) as ConfigService;

describe('readRequiredList', () => {
  it('Если значение содержит список через запятую, то возвращает trimmed items', () => {
    const config = createConfig({
      MCP_ALLOWED_HOSTS: ' localhost:3000 , 127.0.0.1:3000 ',
    });

    expect(readRequiredList(config, 'MCP_ALLOWED_HOSTS')).toEqual([
      'localhost:3000',
      '127.0.0.1:3000',
    ]);
  });

  it('Если значение состоит только из разделителей, то выбрасывает ошибку', () => {
    const config = createConfig({
      MCP_ALLOWED_HOSTS: ' , , ',
    });

    expect(() => readRequiredList(config, 'MCP_ALLOWED_HOSTS')).toThrow(
      'MCP_ALLOWED_HOSTS must contain at least one value',
    );
  });

  it('Если ключ отсутствует, то пробрасывает ошибку ConfigService', () => {
    const config = createConfig({});

    expect(() => readRequiredList(config, 'MCP_ALLOWED_HOSTS')).toThrow(
      'Configuration key "MCP_ALLOWED_HOSTS" does not exist',
    );
  });
});
