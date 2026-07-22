import { containsNormalized } from '@portfolio/common';

import type { Portfolio } from '../load-portfolio';
import type { GetProjectDetailsInput, ListProjectsInput } from '../schemas';

import {
  GetProjectDetailsInputSchema,
  ListProjectsInputSchema,
} from '../schemas';

export const listProjects = (
  portfolio: Portfolio,
  input: ListProjectsInput = {},
) => {
  const { tech, status } = ListProjectsInputSchema.parse(input);

  return portfolio.projects.filter((project) => {
    const matchesTech =
      tech == null ||
      project.stack.some((item) => containsNormalized(item, tech));
    const matchesStatus = status == null || project.status === status;

    return matchesTech && matchesStatus;
  });
};

export const findProjectsByName = (
  portfolio: Portfolio,
  input: GetProjectDetailsInput,
) => {
  const { name } = GetProjectDetailsInputSchema.parse(input);

  return portfolio.projects.filter((project) =>
    containsNormalized(project.name, name),
  );
};
