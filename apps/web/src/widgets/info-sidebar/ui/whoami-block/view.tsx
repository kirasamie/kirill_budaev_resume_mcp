import { ConsoleMarker, KeyValue } from '@shared/ui';

import type { WhoamiBlockProps } from './types';

const locationLabel = 'локация';
const photoPlaceholder = 'фото';

export const WhoamiBlock = ({ title, location }: WhoamiBlockProps) => {
  const locationValue = `${location.city}, ${location.country}`;

  return (
    <div>
      <ConsoleMarker as="p" variant="prompt" label="whoami" className="mb-4" />
      <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full border border-border-base-main bg-main font-mono text-xs text-content-base-tertiary">
        {photoPlaceholder}
      </div>
      <div className="space-y-2">
        <KeyValue label={locationLabel} value={locationValue} />
        <p className="font-mono text-sm text-content-base-secondary">{title}</p>
      </div>
    </div>
  );
};
