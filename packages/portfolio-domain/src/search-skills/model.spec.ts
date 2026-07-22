import { describe, expect, it } from '@jest/globals';

import { loadPortfolio } from '../load-portfolio';
import { searchSkills } from './model';

const portfolio = loadPortfolio();

describe('searchSkills', () => {
  it('Если query совпадает с именем навыка, то возвращает этот навык', () => {
    const skills = searchSkills(portfolio, { query: 'react' });

    expect(skills.some((skill) => skill.name === 'React')).toBe(true);
  });

  it('Если query совпадает с alias навыка, то возвращает этот навык', () => {
    const skills = searchSkills(portfolio, { query: 'ts' });

    expect(skills.some((skill) => skill.name === 'TypeScript')).toBe(true);
  });

  it('Если совпадений нет, то возвращает пустой массив', () => {
    expect(searchSkills(portfolio, { query: 'cobol' })).toEqual([]);
  });

  it('Если передан category, то фильтрует навыки по категории', () => {
    const skills = searchSkills(portfolio, {
      query: 'e',
      category: 'backend',
    });

    expect(skills.every((skill) => skill.category === 'backend')).toBe(true);
    expect(skills.length).toBeGreaterThan(0);
  });

  it('Если input невалиден, то выбрасывает ошибку валидации', () => {
    expect(() => searchSkills(portfolio, { query: '' })).toThrow();
  });

  it('Если query длиннее 100 символов, то выбрасывает ошибку валидации', () => {
    expect(() => searchSkills(portfolio, { query: 'a'.repeat(101) })).toThrow();
  });
});
