import { ConsoleSection } from '@shared/ui';

import { CertificationCard } from '../certification-card';

import type { CertificationsSectionProps } from './types';

export const CertificationsSection = ({
  certifications,
}: CertificationsSectionProps) => (
  <ConsoleSection id="certifications" title="сертификаты">
    <div className="space-y-3">
      {certifications.map((item) => (
        <CertificationCard
          key={`${item.name}-${item.year}`}
          item={item}
        />
      ))}
    </div>
  </ConsoleSection>
);
