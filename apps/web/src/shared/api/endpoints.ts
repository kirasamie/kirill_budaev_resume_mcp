export const Endpoints = {
  Resume: '/api/v1/resume',
} as const;

export type Endpoint = (typeof Endpoints)[keyof typeof Endpoints];
