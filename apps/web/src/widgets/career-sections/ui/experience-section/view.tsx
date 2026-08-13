import { ConsoleSection } from '@shared/ui';

import { ExperienceCard } from '../experience-card';

import type { ExperienceSectionProps } from './types';

export const ExperienceSection = ({ experience }: ExperienceSectionProps) => (
  <ConsoleSection id="work_experience" title="опыт_работы">
    <div className="space-y-8">
      {experience.map((item) => (
        <ExperienceCard key={item.id} item={item} />
      ))}
    </div>
  </ConsoleSection>
);
