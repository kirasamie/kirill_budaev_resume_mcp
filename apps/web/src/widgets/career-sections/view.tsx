import {
  CareerHeader,
  CertificationsSection,
  EducationSection,
  ExperienceSection,
  ProjectsSection,
} from './ui';

import type { CareerSectionsProps } from './types';

export const CareerSections = ({
  profile,
  experience,
  projects,
  education,
  certifications,
}: CareerSectionsProps) => (
  <div className="flex-1 bg-main">
    <CareerHeader
      name={profile.name}
      title={profile.title}
      summary={profile.summary}
    />
    <div className="space-y-2 px-6 py-6 lg:px-10">
      <ExperienceSection experience={experience} />
      <ProjectsSection projects={projects} />
      <EducationSection education={education} />
      <CertificationsSection certifications={certifications} />
    </div>
  </div>
);
