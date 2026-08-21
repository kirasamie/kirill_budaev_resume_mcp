import { ExternalLink, KeyValue } from '@shared/ui';

import type { CertificationCardProps } from './types';

export const CertificationCard = ({ item }: CertificationCardProps) => (
  <KeyValue label={String(item.year)}>
    {item.url && <ExternalLink href={item.url}>{item.name}</ExternalLink>}
    {!item.url && item.name}
  </KeyValue>
);
