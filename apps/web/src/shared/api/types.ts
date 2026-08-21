import { Endpoints } from './endpoints';

export type Endpoint = (typeof Endpoints)[keyof typeof Endpoints];
