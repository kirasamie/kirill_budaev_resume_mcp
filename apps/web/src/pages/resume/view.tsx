import { ConsoleMarker, ConsoleSection } from '@shared/ui';

const placeholder = 'TODO: content';

const sidebarSections = [
  {
    id: 'contact',
    title: 'contact',
    description: 'email, phone, telegram',
  },
  {
    id: 'skills',
    title: 'skills',
    description: 'grouped by category + tags',
  },
  {
    id: 'languages',
    title: 'languages',
    description: 'from profile.languages',
  },
] as const;

const mainSections = [
  {
    id: 'work_experience',
    title: 'work_experience',
    description: 'expandable timeline (#1)',
  },
  {
    id: 'projects',
    title: 'projects',
    description: 'project cards',
  },
  {
    id: 'education',
    title: 'education',
    description: 'education list',
  },
  {
    id: 'certifications',
    title: 'certifications',
    description: 'certifications list',
  },
] as const;

const Placeholder = () => (
  <p className="font-mono text-sm text-content-base-tertiary">{placeholder}</p>
);

export const ResumePage = () => (
  <div className="mx-auto w-full max-w-5xl px-6 py-10">
    {/* CV card — layout as #1 Interactive Resume */}
    <div className="flex flex-col overflow-hidden rounded-xl border border-border-base-main lg:flex-row">
      {/* Sidebar: profile meta + contact + skills (#1 left column) */}
      <aside className="border-b border-border-base-main bg-surface/80 lg:w-80 lg:shrink-0 lg:border-r lg:border-b-0">
        <div className="space-y-8 p-6 lg:p-8">
          <div>
            <ConsoleMarker
              as="p"
              variant="prompt"
              label="whoami"
              className="mb-4"
            />
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full border border-border-base-main bg-main font-mono text-xs text-content-base-tertiary">
              photo
            </div>
            <Placeholder />
          </div>

          {sidebarSections.map((section) => (
            <ConsoleSection
              key={section.id}
              id={section.id}
              title={section.title}
              description={section.description}
              className="py-0"
            >
              <Placeholder />
            </ConsoleSection>
          ))}
        </div>
      </aside>

      {/* Main: header + experience + projects + education (#1 right column) */}
      <div className="flex-1 bg-main">
        <header className="border-b border-border-base-main px-6 py-8 lg:px-10">
          <p className="font-mono text-xs uppercase tracking-widest text-content-base-tertiary">
            name / title / summary
          </p>
          <Placeholder />
        </header>

        <div className="space-y-2 px-6 py-6 lg:px-10">
          {mainSections.map((section) => (
            <ConsoleSection
              key={section.id}
              id={section.id}
              title={section.title}
              description={section.description}
            >
              <Placeholder />
            </ConsoleSection>
          ))}
        </div>
      </div>
    </div>
  </div>
);
