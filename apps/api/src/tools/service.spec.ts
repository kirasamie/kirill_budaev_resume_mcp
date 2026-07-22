import { beforeEach, describe, expect, it } from '@jest/globals';
import { ProjectDetailsStatus, type Portfolio } from '@portfolio/domain';

import type { PortfolioService } from '../portfolio';

import { ToolsService } from './service';

const portfolioFixture: Portfolio = {
  profile: {
    name: 'Test',
    title: 'Developer',
    summary: 'Summary',
    location: { city: 'Moscow', country: 'Russia' },
    workFormat: ['remote'],
    relocation: false,
    experienceYears: 1,
    languages: [{ name: 'Русский', level: 'native' }],
    availability: 'open',
  },
  contact: {
    email: 'test@test.com',
    phone: '+70000000000',
    telegram: 'https://t.me/test',
    preferredContact: 'email',
  },
  experience: [
    {
      id: 'exp-1',
      company: 'Acme',
      role: 'Dev',
      startDate: '2020-01',
      endDate: null,
      stack: ['TypeScript'],
      highlights: [],
    },
  ],
  projects: [
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
  ],
  skills: [
    {
      name: 'React',
      category: 'frontend',
      level: 'advanced',
      aliases: ['reactjs'],
    },
  ],
  education: [],
  certifications: [],
  resumeMarkdown: '# Resume',
};

describe('ToolsService', () => {
  let service: ToolsService;

  beforeEach(() => {
    const portfolioService = {
      getPortfolio: () => portfolioFixture,
    } as PortfolioService;

    service = new ToolsService(portfolioService);
  });

  describe('getContact', () => {
    it('Если в contact есть phone, то в ответе только email и telegram', () => {
      expect(service.getContact()).toEqual({
        email: 'test@test.com',
        telegram: 'https://t.me/test',
      });
    });
  });

  describe('getProfile', () => {
    it('Если portfolio загружен, то возвращает profile', () => {
      expect(service.getProfile()).toEqual(portfolioFixture.profile);
    });
  });

  describe('getExperience', () => {
    it('Если portfolio загружен, то возвращает experience', () => {
      expect(service.getExperience()).toEqual(portfolioFixture.experience);
    });
  });

  describe('getResumeMarkdown', () => {
    it('Если portfolio загружен, то возвращает resumeMarkdown', () => {
      expect(service.getResumeMarkdown()).toBe('# Resume');
    });
  });

  describe('listProjects', () => {
    it('Если input пустой, то возвращает все проекты', () => {
      expect(service.listProjects()).toHaveLength(2);
    });

    it('Если tech есть в stack, то возвращает отфильтрованные проекты', () => {
      const result = service.listProjects({ tech: 'nest' });

      expect(result).toHaveLength(1);
      expect(result[0]?.id).toBe('alpha');
    });

    it('Если tech не найден, то возвращает пустой массив', () => {
      expect(service.listProjects({ tech: 'angular' })).toEqual([]);
    });
  });

  describe('searchSkills', () => {
    it('Если query совпадает с name или alias, то возвращает навыки', () => {
      expect(service.searchSkills({ query: 'reactjs' })).toEqual([
        portfolioFixture.skills[0],
      ]);
    });

    it('Если совпадений нет, то возвращает пустой массив', () => {
      expect(service.searchSkills({ query: 'cobol' })).toEqual([]);
    });
  });

  describe('getProjectDetails', () => {
    it('Если найдено одно совпадение, то возвращает found и проект', () => {
      expect(service.getProjectDetails({ name: 'alpha' })).toEqual({
        status: ProjectDetailsStatus.FOUND,
        project: portfolioFixture.projects[0],
      });
    });

    it('Если совпадений нет, то возвращает notFound', () => {
      expect(service.getProjectDetails({ name: 'missing' })).toEqual({
        status: ProjectDetailsStatus.NOT_FOUND,
      });
    });

    it('Если найдено несколько совпадений, то возвращает ambiguous и имена', () => {
      expect(service.getProjectDetails({ name: 'platform' })).toEqual({
        status: ProjectDetailsStatus.AMBIGUOUS,
        names: ['Alpha Platform', 'Beta Platform'],
      });
    });
  });
});
