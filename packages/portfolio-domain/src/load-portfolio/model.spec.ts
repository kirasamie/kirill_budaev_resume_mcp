jest.mock('@portfolio/data', () => {
  const actual = jest.requireActual('@portfolio/data');

  return {
    ...actual,
    loadPortfolioRaw: jest.fn(actual.loadPortfolioRaw),
    readResumeMarkdown: jest.fn(actual.readResumeMarkdown),
  };
});

import * as data from '@portfolio/data';

import { getResumeMarkdown, loadPortfolio } from './model';

const actualData = jest.requireActual<typeof data>('@portfolio/data');
const loadPortfolioRawMock = jest.mocked(data.loadPortfolioRaw);
const readResumeMarkdownMock = jest.mocked(data.readResumeMarkdown);

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

describe('getResumeMarkdown', () => {
  afterEach(() => {
    readResumeMarkdownMock.mockImplementation(actualData.readResumeMarkdown);
  });

  it('Если файл резюме доступен, то возвращает непустую строку без полного парсинга портфолио', () => {
    const markdown = getResumeMarkdown();

    expect(typeof markdown).toBe('string');
    expect(markdown.length).toBeGreaterThan(0);
  });

  it('Если файл резюме пустой, то возвращает пустую строку', () => {
    readResumeMarkdownMock.mockReturnValue('');

    expect(getResumeMarkdown()).toBe('');
  });

  it('Если чтение резюме завершается ошибкой, то getResumeMarkdown пробрасывает её', () => {
    readResumeMarkdownMock.mockImplementation(() => {
      throw new Error('read failed');
    });

    expect(() => getResumeMarkdown()).toThrow('read failed');
  });
});
