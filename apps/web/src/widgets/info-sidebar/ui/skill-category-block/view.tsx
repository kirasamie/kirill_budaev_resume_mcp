import { Tag } from '@shared/ui';

import type { SkillCategoryBlockProps } from './types';

export const SkillCategoryBlock = ({
  category,
  skills,
}: SkillCategoryBlockProps) => (
  <div>
    <p className="mb-2 font-mono text-xs text-content-base-tertiary">
      {category}
    </p>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <Tag key={skill.name}>{skill.name}</Tag>
      ))}
    </div>
  </div>
);
