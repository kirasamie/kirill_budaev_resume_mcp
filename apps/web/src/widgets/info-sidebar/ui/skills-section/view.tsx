import { ConsoleSection } from '@shared/ui';

import { groupSkillsByCategory } from '../../lib';
import { SkillCategoryBlock } from '../skill-category-block';

import type { SkillsSectionProps } from './types';

export const SkillsSection = ({ skills }: SkillsSectionProps) => (
  <ConsoleSection id="skills" title="навыки" className="py-0">
    <div className="space-y-4">
      {groupSkillsByCategory(skills).map((group) => (
        <SkillCategoryBlock
          key={group.category}
          category={group.category}
          skills={group.skills}
        />
      ))}
    </div>
  </ConsoleSection>
);
