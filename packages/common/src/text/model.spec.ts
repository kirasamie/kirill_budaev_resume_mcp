import { describe, expect, it } from '@jest/globals';

import { containsNormalized, containsNormalizedIn } from './model';

describe('containsNormalized', () => {
  it('Если подстрока есть в тексте без учёта регистра, то возвращает true', () => {
    expect(containsNormalized('NestJS', 'nest')).toBe(true);
  });

  it('Если подстроки нет в тексте, то возвращает false', () => {
    expect(containsNormalized('React', 'vue')).toBe(false);
  });

  it('Если needle пустой после trim, то возвращает true для любого haystack', () => {
    expect(containsNormalized('React', '   ')).toBe(true);
  });
});

describe('containsNormalizedIn', () => {
  it('Если query совпадает с одним из значений, то возвращает true', () => {
    expect(containsNormalizedIn(['JavaScript', 'TypeScript'], 'script')).toBe(
      true,
    );
  });

  it('Если массив пустой, то возвращает false', () => {
    expect(containsNormalizedIn([], 'react')).toBe(false);
  });

  it('Если query не совпадает ни с одним значением, то возвращает false', () => {
    expect(containsNormalizedIn(['React', 'Vue'], 'angular')).toBe(false);
  });
});
