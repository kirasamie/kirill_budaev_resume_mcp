import { afterEach, describe, expect, it, jest } from '@jest/globals';

import * as data from '@portfolio/data';

import { loadPortfolio } from './model';

jest.mock('@portfolio/data', () => {
  const actual = jest.requireActual<typeof data>('@portfolio/data');

  return {
    ...actual,
    loadPortfolioRaw: jest.fn(actual.loadPortfolioRaw),
  };
});

const actualData = jest.requireActual<typeof data>('@portfolio/data');
const loadPortfolioRawMock = jest.mocked(data.loadPortfolioRaw);

describe('loadPortfolio', () => {
  afterEach(() => {
    loadPortfolioRawMock.mockImplementation(actualData.loadPortfolioRaw);
  });

  it('Если сырые данные соответствуют схеме, то возвращает валидное портфолио', () => {
    const portfolio = loadPortfolio();

    expect(portfolio.profile.name).toBeTruthy();
    expect(portfolio.skills.length).toBeGreaterThan(0);
  });

  it('Если в сырых данных пустой markdown, то схема принимает портфолио', () => {
    loadPortfolioRawMock.mockReturnValue({
      ...actualData.loadPortfolioRaw(),
      resumeMarkdown: '',
    });

    const portfolio = loadPortfolio();

    expect(portfolio.profile.name).toBeTruthy();
    expect(portfolio.skills.length).toBeGreaterThan(0);
  });

  it('Если сырые данные не проходят схему, то loadPortfolio выбрасывает ошибку', () => {
    loadPortfolioRawMock.mockReturnValue({
      profile: {},
      contact: {},
      experience: [],
      projects: [],
      skills: [],
      education: [],
      certifications: [],
      resumeMarkdown: '',
    } as ReturnType<typeof data.loadPortfolioRaw>);

    expect(() => loadPortfolio()).toThrow();
  });
});
