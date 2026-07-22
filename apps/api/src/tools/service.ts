import { Injectable } from '@nestjs/common';
import {
  getProjectDetails as getProjectDetailsFromPortfolio,
  GetProjectDetailsInput,
  ListProjectsInput,
  SearchSkillsInput,
  listProjects as listProjectsFromPortfolio,
  searchSkills as searchSkillsFromPortfolio,
  toPublicContact,
} from '@portfolio/domain';

import { PortfolioService } from '../portfolio';

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
    return toPublicContact(this.portfolio.contact);
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
    return getProjectDetailsFromPortfolio(this.portfolio, input);
  }
}
