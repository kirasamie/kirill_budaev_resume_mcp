import type { CareerHeaderProps } from './types';

export const CareerHeader = ({ name, title, summary }: CareerHeaderProps) => (
  <header className="border-b border-border-base-main px-6 py-8 lg:px-10">
    <h1 className="text-3xl font-bold tracking-tight text-content-base-primary sm:text-4xl">
      {name}
    </h1>
    <p className="mt-2 font-mono text-base text-content-base-secondary">
      {title}
    </p>
    <p className="mt-4 max-w-2xl text-base leading-relaxed text-content-base-tertiary">
      {summary}
    </p>
  </header>
);
