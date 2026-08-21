import { Tag } from '@shared/ui';

import {
  formatCompanyLine,
  formatExperiencePeriod,
  toLinkItems,
} from '../../lib';
import { LinkList } from '../link-list';

import type { ExperienceCardProps } from './types';

export const ExperienceCard = ({ item }: ExperienceCardProps) => (
  <article className="space-y-3">
    <div>
      <h3 className="text-lg font-semibold text-content-base-primary">
        {item.role}
      </h3>
      <p className="font-mono text-sm text-content-base-secondary">
        {formatCompanyLine(item.company, item.location)}
      </p>
      <p className="mt-1 font-mono text-xs text-content-base-tertiary">
        {formatExperiencePeriod(item.startDate, item.endDate)}
      </p>
    </div>
    <ul className="list-disc space-y-1 pl-5 text-sm text-content-base-secondary">
      {item.highlights.map((highlight) => (
        <li key={highlight}>{highlight}</li>
      ))}
    </ul>
    <div className="flex flex-wrap gap-2">
      {item.stack.map((tech) => (
        <Tag key={tech}>{tech}</Tag>
      ))}
    </div>
    <LinkList items={toLinkItems(item.links)} />
  </article>
);
