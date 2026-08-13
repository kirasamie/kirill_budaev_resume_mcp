import type { AxiosAdapter } from 'axios';
import { AxiosError, AxiosHeaders } from 'axios';

import type { MockApiResponses } from './types';

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

export const createMockApiAdapter = (
  responses: MockApiResponses,
): AxiosAdapter => async (config) => {
  await delay(MOCK_DELAY_MS);

  const path = resolvePath(config.url);

  if (Object.hasOwn(responses, path)) {
    return {
      data: responses[path],
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
