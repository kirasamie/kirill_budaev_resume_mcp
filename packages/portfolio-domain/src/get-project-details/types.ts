import type { Project } from '../schemas';
import type { ProjectDetailsStatus } from './constants';
import type { EnumValue } from '@portfolio/common';

export type ProjectDetailsStatusType = EnumValue<typeof ProjectDetailsStatus>;

export type ProjectDetailsResult =
  | {
      status: typeof ProjectDetailsStatus.FOUND;
      project: Project;
    }
  | {
      status: typeof ProjectDetailsStatus.AMBIGUOUS;
      names: string[];
    }
  | {
      status: typeof ProjectDetailsStatus.NOT_FOUND;
    };
