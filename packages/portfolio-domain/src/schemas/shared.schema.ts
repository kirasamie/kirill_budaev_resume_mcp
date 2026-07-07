import { z } from 'zod';

import {
  Availability,
  enumValues,
  LanguageLevel,
  ProjectStatus,
  SkillCategory,
  SkillLevel,
  WorkFormat,
} from './constants';

export const SkillCategorySchema = z.enum(enumValues(SkillCategory));

export const SkillLevelSchema = z.enum(enumValues(SkillLevel));

export const ProjectStatusSchema = z.enum(enumValues(ProjectStatus));

export const WorkFormatSchema = z.enum(enumValues(WorkFormat));

export const AvailabilitySchema = z.enum(enumValues(Availability));

export const LanguageLevelSchema = z.enum(enumValues(LanguageLevel));

export type {
  Availability,
  LanguageLevel,
  ProjectStatus,
  SkillCategory,
  SkillLevel,
  WorkFormat,
};
