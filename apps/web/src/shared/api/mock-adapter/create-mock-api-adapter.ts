import type { AxiosAdapter } from 'axios';
import { AxiosError, AxiosHeaders } from 'axios';

import { resumeRaw } from '@portfolio/data/resume';

import { Endpoints } from '../endpoints';

const MOCK_DELAY_MS = 300;

const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const resolvePath = (url = '') => {
  try {
    return new URL(url, 'http://local').pathname;
  } catch {
    return url;
  }
};

export const createMockApiAdapter = (): AxiosAdapter => async (config) => {
  await delay(MOCK_DELAY_MS);

  const path = resolvePath(config.url);

  if (path === Endpoints.Resume) {
    return {
      data: resumeRaw,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        ...config,
        headers: AxiosHeaders.from(config.headers ?? {}),
      },
    };
  }

  throw new AxiosError(
    `Mock API: no handler for ${path}`,
    AxiosError.ERR_BAD_REQUEST,
    config,
  );
};
