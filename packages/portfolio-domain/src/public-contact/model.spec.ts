import { describe, expect, it } from '@jest/globals';

import { toPublicContact } from './model';

const fullContact = {
  email: 'test@test.com',
  phone: '+70000000000',
  telegram: 'https://t.me/test',
  preferredContact: 'phone' as const,
  messengers: ['WhatsApp'],
};

describe('toPublicContact', () => {
  it('Если передан полный контакт, то возвращает только email и telegram', () => {
    const result = toPublicContact(fullContact);

    expect(result).toEqual({
      email: 'test@test.com',
      telegram: 'https://t.me/test',
    });
  });

  it('Если передан контакт без messengers, то публичный контакт всё равно валиден', () => {
    const contactWithoutMessengers = {
      email: fullContact.email,
      phone: fullContact.phone,
      telegram: fullContact.telegram,
      preferredContact: fullContact.preferredContact,
    };

    expect(toPublicContact(contactWithoutMessengers)).toEqual({
      email: 'test@test.com',
      telegram: 'https://t.me/test',
    });
  });

  it('Если email невалиден, то выбрасывает ошибку валидации', () => {
    expect(() =>
      toPublicContact({
        ...fullContact,
        email: 'not-an-email',
      }),
    ).toThrow();
  });
});
