import { Container } from '@shared/ui';

import type { HeroProps } from './types';

export const Hero = ({ profile }: HeroProps) => (
  <section className="border-b border-slate-800/80 py-16">
    <Container>
      <p className="mb-3 text-sm font-medium uppercase tracking-widest text-sky-400">
        Portfolio
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
        {profile.name}
      </h1>
      <p className="mt-3 text-xl text-slate-300">{profile.title}</p>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400">
        {profile.summary}
      </p>
    </Container>
  </section>
);
