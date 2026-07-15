import { afterEach, describe, expect, it, jest } from '@jest/globals';

import * as readResume from '../read-resume';
import { loadPortfolioRaw } from './model';

describe('loadPortfolioRaw', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Если ассеты портфолио доступны, то возвращает профиль, контакт и markdown резюме', () => {
    const portfolio = loadPortfolioRaw();

    expect(portfolio.profile.name).toBeTruthy();
    expect(portfolio.contact.email).toBeTruthy();
    expect(portfolio.experience.length).toBeGreaterThan(0);
    expect(portfolio.resumeMarkdown.length).toBeGreaterThan(0);
  });

  it('Если markdown резюме пустой, то портфолио собирается с пустым resumeMarkdown', () => {
    jest.spyOn(readResume, 'readResumeMarkdown').mockReturnValue('');

    const portfolio = loadPortfolioRaw();

    expect(portfolio.profile.name).toBeTruthy();
    expect(portfolio.resumeMarkdown).toBe('');
  });

  it('Если чтение резюме завершается ошибкой, то loadPortfolioRaw пробрасывает её', () => {
    jest.spyOn(readResume, 'readResumeMarkdown').mockImplementation(() => {
      throw new Error('read failed');
    });

    expect(() => loadPortfolioRaw()).toThrow('read failed');
  });
});
