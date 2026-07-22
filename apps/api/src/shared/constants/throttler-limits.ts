import { ENV_KEYS } from './env-keys';

interface ThrottlerLimits {
  ttl: number;
  limit: number | (() => number);
}

export const THROTTLER_LIMITS_NAME = {
  DEFAULT: 'DEFAULT',
  HARD: 'HARD',
} as const;

export const THROTTLER_LIMITS: Record<
  (typeof THROTTLER_LIMITS_NAME)[keyof typeof THROTTLER_LIMITS_NAME],
  ThrottlerLimits
> = {
  [THROTTLER_LIMITS_NAME.DEFAULT]: {
    ttl: 60000,
    limit: 60,
  },
  [THROTTLER_LIMITS_NAME.HARD]: {
    ttl: 60000,
    limit: () => Number(process.env[ENV_KEYS.THROTTLE_HARD_LIMIT] ?? 30),
  },
};
