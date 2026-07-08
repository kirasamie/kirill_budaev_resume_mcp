import { describe, expect, it } from '@jest/globals';

import { createPortfolioFixture } from '../test-fixtures';
import { findProjectsByName, listProjects } from './model';

const portfolio = createPortfolioFixture([
  {
    id: 'alpha',
    name: 'Alpha Platform',
    company: 'A',
    summary: 's',
    role: 'dev',
    stack: ['React', 'NestJS'],
    highlights: [],
    status: 'active',
  },
  {
    id: 'beta',
    name: 'Beta Platform',
    company: 'B',
    summary: 's',
    role: 'dev',
    stack: ['Vue'],
    highlights: [],
    status: 'completed',
  },
]);

describe('listProjects', () => {
  it('Если фильтры не переданы, то возвращает все проекты', () => {
    expect(listProjects(portfolio, {})).toHaveLength(2);
  });

  it('Если передан tech, то возвращает проекты со stack, содержащим tech', () => {
    const result = listProjects(portfolio, { tech: 'nest' });

    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('alpha');
  });

  it('Если tech не найден в stack, то возвращает пустой массив', () => {
    expect(listProjects(portfolio, { tech: 'angular' })).toEqual([]);
  });

  it('Если передан status, то возвращает проекты с этим статусом', () => {
    const result = listProjects(portfolio, { status: 'completed' });

    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('beta');
  });
});

describe('findProjectsByName', () => {
  it('Если имя проекта содержит query, то возвращает совпадения', () => {
    const projects = findProjectsByName(portfolio, { name: 'alpha' });

    expect(projects).toHaveLength(1);
    expect(projects[0]?.id).toBe('alpha');
  });

  it('Если проект не найден, то возвращает пустой массив', () => {
    expect(findProjectsByName(portfolio, { name: 'missing' })).toEqual([]);
  });

  it('Если найдено несколько проектов, то возвращает все совпадения', () => {
    const projects = findProjectsByName(portfolio, { name: 'platform' });

    expect(projects).toHaveLength(2);
  });
});
