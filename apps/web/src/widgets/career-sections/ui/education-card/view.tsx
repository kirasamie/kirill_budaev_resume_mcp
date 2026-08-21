import {
  formatDegreeLine,
  formatEducationMetaLine,
} from '../../lib';

import type { EducationCardProps } from './types';

export const EducationCard = ({ item }: EducationCardProps) => (
  <article>
    <h3 className="text-base font-semibold text-content-base-primary">
      {item.institution}
    </h3>
    <p className="font-mono text-sm text-content-base-secondary">
      {formatDegreeLine(item.degree, item.field)}
    </p>
    <p className="mt-1 font-mono text-xs text-content-base-tertiary">
      {formatEducationMetaLine(item.year, item.city)}
    </p>
  </article>
);
