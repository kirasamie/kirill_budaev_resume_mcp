import { ConsoleMarker, Container } from '@shared/ui';

import type { HeroProps } from './types';

export const Hero = ({ profile }: HeroProps) => (
  <section className="border-b border-border-base-main/80 py-16">
    <Container>
      <ConsoleMarker
        as="p"
        variant="prompt"
        label="whoami"
        className="mb-4"
      />
      <h1 className="text-4xl font-bold tracking-tight text-content-base-primary sm:text-5xl">
        {profile.name}
      </h1>
      <p className="mt-3 font-mono text-base text-content-base-secondary">
        {profile.title}
      </p>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-content-base-tertiary">
        {profile.summary}
      </p>
    </Container>
  </section>
);
