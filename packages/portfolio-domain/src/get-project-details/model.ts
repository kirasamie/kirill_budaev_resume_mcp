import { findProjectsByName } from '../list-projects';
import { ProjectDetailsStatus } from './constants';

import type { Portfolio } from '../load-portfolio';
import type { GetProjectDetailsInput } from '../schemas';
import type { ProjectDetailsResult } from './types';

export const getProjectDetails = (
  portfolio: Portfolio,
  input: GetProjectDetailsInput,
): ProjectDetailsResult => {
  const matches = findProjectsByName(portfolio, input);

  if (!matches.length) {
    return { status: ProjectDetailsStatus.NOT_FOUND };
  }

  if (matches.length === 1) {
    return { status: ProjectDetailsStatus.FOUND, project: matches[0]! };
  }

  return {
    status: ProjectDetailsStatus.AMBIGUOUS,
    names: matches.map((project) => project.name),
  };
};
