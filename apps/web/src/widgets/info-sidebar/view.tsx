import {
  ContactSection,
  LanguagesSection,
  SkillsSection,
  WhoamiBlock,
} from './ui';

import type { InfoSidebarProps } from './types';

export const InfoSidebar = ({
  profile,
  contact,
  skills,
}: InfoSidebarProps) => (
  <aside className="border-b border-border-base-main bg-surface/80 lg:w-80 lg:shrink-0 lg:border-r lg:border-b-0">
    <div className="space-y-8 p-6 lg:p-8">
      <WhoamiBlock title={profile.title} location={profile.location} />
      <ContactSection contact={contact} />
      <SkillsSection skills={skills} />
      <LanguagesSection languages={profile.languages} />
    </div>
  </aside>
);
