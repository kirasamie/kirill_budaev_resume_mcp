import { ConsoleSection, KeyValue } from '@shared/ui';

import type { LanguagesSectionProps } from './types';

export const LanguagesSection = ({ languages }: LanguagesSectionProps) => (
  <ConsoleSection id="languages" title="языки" className="py-0">
    <div className="space-y-2">
      {languages.map((language) => (
        <KeyValue
          key={language.name}
          label={language.name}
          value={language.level}
        />
      ))}
    </div>
  </ConsoleSection>
);
