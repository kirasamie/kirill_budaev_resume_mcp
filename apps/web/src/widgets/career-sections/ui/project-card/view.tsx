import { Tag } from '@shared/ui';

import { formatProjectMetaLine, toLinkItems } from '../../lib';
import { LinkList } from '../link-list';

import type { ProjectCardProps } from './types';

export const ProjectCard = ({ project }: ProjectCardProps) => (
  <article className="space-y-3">
    <div>
      <h3 className="text-lg font-semibold text-content-base-primary">
        {project.name}
      </h3>
      <p className="font-mono text-sm text-content-base-secondary">
        {formatProjectMetaLine(project.company, project.role)}
      </p>
      <p className="mt-2 text-sm text-content-base-tertiary">{project.summary}</p>
    </div>
    <ul className="list-disc space-y-1 pl-5 text-sm text-content-base-secondary">
      {project.highlights.map((highlight) => (
        <li key={highlight}>{highlight}</li>
      ))}
    </ul>
    <div className="flex flex-wrap gap-2">
      {project.stack.map((tech) => (
        <Tag key={tech}>{tech}</Tag>
      ))}
    </div>
    <LinkList items={toLinkItems(project.links)} />
  </article>
);
