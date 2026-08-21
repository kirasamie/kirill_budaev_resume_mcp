import { describe, expect, it } from '@jest/globals';

import { isErrorOfType, isTaggedError } from './guards';
import { TaggedError } from './model';

describe('TaggedError', () => {
  it('Если создана с code и message, то сохраняет их', () => {
    const error = new TaggedError('TEST', 'something failed');

    expect(error.code).toBe('TEST');
    expect(error.message).toBe('something failed');
    expect(error.name).toBe('TaggedError: TEST');
  });

  it('Если передан cause, то он доступен в error.cause', () => {
    const cause = new Error('root');
    const error = new TaggedError('TEST', 'wrapped', cause);

    expect(error.cause).toBe(cause);
  });
});

describe('isTaggedError', () => {
  it('Если значение TaggedError, то возвращает true', () => {
    expect(isTaggedError(new TaggedError('TEST'))).toBe(true);
  });

  it('Если значение обычный Error, то возвращает false', () => {
    expect(isTaggedError(new Error('nope'))).toBe(false);
  });
});

describe('isErrorOfType', () => {
  it('Если code совпадает, то возвращает true', () => {
    const error = new TaggedError('AXIOS_PROVIDER', 'missing provider');

    expect(isErrorOfType(error, 'AXIOS_PROVIDER')).toBe(true);
  });

  it('Если code не совпадает, то возвращает false', () => {
    const error = new TaggedError('AXIOS_PROVIDER', 'missing provider');

    expect(isErrorOfType(error, 'RESUME_FETCH')).toBe(false);
  });
});
