import { Injectable } from '@nestjs/common';
import {
  findProjectsByName,
  GetProjectDetailsInput,
  ListProjectsInput,
  SearchSkillsInput,
  listProjects as listProjectsFromPortfolio,
  searchSkills as searchSkillsFromPortfolio,
} from '@portfolio/domain';

import { PortfolioService } from '../portfolio';
import { ToolStatus } from './constants';

@Injectable()
export class ToolsService {
  constructor(private readonly portfolioService: PortfolioService) {}

  private get portfolio() {
    return this.portfolioService.getPortfolio();
  }
  getProfile() {
    return this.portfolio.profile;
  }

  getContact() {
    return this.portfolio.contact;
  }

  getExperience() {
    return this.portfolio.experience;
  }

  getResumeMarkdown() {
    return this.portfolio.resumeMarkdown;
  }

  listProjects(input?: ListProjectsInput) {
    return listProjectsFromPortfolio(this.portfolio, input);
  }

  searchSkills(input: SearchSkillsInput) {
    return searchSkillsFromPortfolio(this.portfolio, input);
  }

  getProjectDetails(input: GetProjectDetailsInput) {
    const matches = findProjectsByName(this.portfolio, input);

    if (!matches.length) {
      //TODO: интеграция сервиса ошибок
      return { status: ToolStatus.NOT_FOUND };
    }

    if (matches.length === 1) {
      return { status: ToolStatus.FOUND, project: matches[0] };
    }

    return { status: ToolStatus.AMBIGUOUS, names: matches.map((p) => p.name) };
  }
}
