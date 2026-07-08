import type { ToolStatus } from './constants';
import type { EnumValue } from '@portfolio/common';
import type { Project } from '@portfolio/domain';

export type ToolStatusType = EnumValue<typeof ToolStatus>;

export type ProjectDetailsResult =
  | {
      status: typeof ToolStatus.FOUND;
      project: Project;
    }
  | {
      status: typeof ToolStatus.AMBIGUOUS;
      names: string[];
    }
  | {
      status: typeof ToolStatus.NOT_FOUND;
    };
