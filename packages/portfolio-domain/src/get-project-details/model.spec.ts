import { describe, expect, it } from '@jest/globals';

import { createPortfolioFixture } from '../test-fixtures';
import { ProjectDetailsStatus } from './constants';
import { getProjectDetails } from './model';

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

describe('getProjectDetails', () => {
  it('Если найдено одно совпадение, то возвращает found и проект', () => {
    expect(getProjectDetails(portfolio, { name: 'alpha' })).toEqual({
      status: ProjectDetailsStatus.FOUND,
      project: portfolio.projects[0],
    });
  });

  it('Если совпадений нет, то возвращает notFound', () => {
    expect(getProjectDetails(portfolio, { name: 'missing' })).toEqual({
      status: ProjectDetailsStatus.NOT_FOUND,
    });
  });

  it('Если найдено несколько совпадений, то возвращает ambiguous и имена', () => {
    expect(getProjectDetails(portfolio, { name: 'platform' })).toEqual({
      status: ProjectDetailsStatus.AMBIGUOUS,
      names: ['Alpha Platform', 'Beta Platform'],
    });
  });
});
