import { describe, expect, it } from '@jest/globals';

import type { EnumValue } from './types';

import { enumValues } from './model';

const Status = {
  Active: 'active',
  Done: 'done',
} as const;

const SingleStatus = {
  Only: 'only',
} as const;

describe('EnumValue', () => {
  it('Если значение объявлено в const-объекте, то оно совпадает с литералом', () => {
    const value: EnumValue<typeof Status> = Status.Active;

    expect(value).toBe('active');
  });

  it('Если в const-объекте несколько ключей, то каждый литерал доступен как значение', () => {
    const value: EnumValue<typeof Status> = Status.Done;

    expect(value).toBe('done');
  });

  it('Если значение не объявлено в const-объекте, то его нет среди допустимых литералов', () => {
    const allowed = enumValues(Status);

    expect(allowed).not.toContain('missing');
  });
});

describe('enumValues', () => {
  it('Если const-объект содержит несколько значений, то возвращает кортеж для z.enum', () => {
    expect(enumValues(Status)).toEqual(['active', 'done']);
  });

  it('Если const-объект содержит одно значение, то возвращает кортеж из одного элемента', () => {
    expect(enumValues(SingleStatus)).toEqual(['only']);
  });

  it('Если const-объект пустой, то возвращает пустой массив', () => {
    expect(enumValues({})).toEqual([]);
  });
});
