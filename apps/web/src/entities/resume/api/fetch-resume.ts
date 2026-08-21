import type { AxiosInstance } from 'axios';
import {
  ResumePortfolioSchema,
  type ResumePortfolio,
} from '@portfolio/domain/resume';

import { Endpoints } from '@shared/api';

import { ResumeFetchError } from './errors';

export const fetchResume = async (
  axios: AxiosInstance,
): Promise<ResumePortfolio> => {
  try {
    const { data } = await axios.get<unknown>(Endpoints.Resume);

    return ResumePortfolioSchema.parse(data);
  } catch (cause) {
    throw new ResumeFetchError('Не удалось загрузить резюме', cause);
  }
};
