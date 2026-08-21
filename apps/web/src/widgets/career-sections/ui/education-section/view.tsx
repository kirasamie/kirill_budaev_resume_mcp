import { ConsoleSection } from '@shared/ui';

import { EducationCard } from '../education-card';

import type { EducationSectionProps } from './types';

export const EducationSection = ({ education }: EducationSectionProps) => (
  <ConsoleSection id="education" title="образование">
    <div className="space-y-4">
      {education.map((item) => (
        <EducationCard
          key={`${item.institution}-${item.year}`}
          item={item}
        />
      ))}
    </div>
  </ConsoleSection>
);
