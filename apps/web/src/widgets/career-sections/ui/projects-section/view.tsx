import { ConsoleSection } from '@shared/ui';

import { ProjectCard } from '../project-card';

import type { ProjectsSectionProps } from './types';

export const ProjectsSection = ({ projects }: ProjectsSectionProps) => (
  <ConsoleSection id="projects" title="проекты">
    <div className="space-y-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  </ConsoleSection>
);
