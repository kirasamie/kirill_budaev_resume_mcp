import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { readFileSync } from 'fs';

import { readResumeMarkdown } from './model';

jest.mock('fs', () => {
  const actual = jest.requireActual<typeof import('fs')>('fs');

  return {
    ...actual,
    readFileSync: jest.fn(actual.readFileSync),
  };
});

const readFileSyncMock = jest.mocked(readFileSync);

describe('readResumeMarkdown', () => {
  afterEach(() => {
    readFileSyncMock.mockImplementation(
      jest.requireActual<typeof import('fs')>('fs').readFileSync,
    );
  });

  it('Если файл резюме существует и содержит текст, то возвращает непустую строку', () => {
    const markdown = readResumeMarkdown();

    expect(typeof markdown).toBe('string');
    expect(markdown.length).toBeGreaterThan(0);
  });

  it('Если файл резюме существует, но пустой, то возвращает пустую строку', () => {
    readFileSyncMock.mockReturnValue('');

    expect(readResumeMarkdown()).toBe('');
  });

  it('Если файл резюме недоступен, то выбрасывает ошибку', () => {
    readFileSyncMock.mockImplementation(() => {
      throw new Error('ENOENT');
    });

    expect(() => readResumeMarkdown()).toThrow('ENOENT');
  });
});
