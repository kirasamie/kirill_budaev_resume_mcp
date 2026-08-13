import { NavLink } from 'react-router-dom';

import { ConsoleMarker, Container } from '@shared/ui';

const brand = 'mcp_resume';
const mcpNavLabel = 'mcp';
const resumeNavLabel = 'resume';
const navInactiveClassName =
  'text-content-base-tertiary group-hover:text-content-accent-hover';
const navActiveClassName = 'text-content-accent-default';

export const SiteHeader = () => (
  <header className="border-b border-border-base-main/80">
    <Container className="flex items-center justify-between py-5">
      <NavLink to="/" className="transition hover:opacity-80">
        <ConsoleMarker variant="plain" label={brand} />
      </NavLink>
      <nav className="flex gap-4">
        <NavLink to="/" end className="group">
          {({ isActive }) => (
            <ConsoleMarker
              variant="comment"
              label={mcpNavLabel}
              className={isActive ? navActiveClassName : navInactiveClassName}
            />
          )}
        </NavLink>
        <NavLink to="/resume" className="group">
          {({ isActive }) => (
            <ConsoleMarker
              variant="comment"
              label={resumeNavLabel}
              className={isActive ? navActiveClassName : navInactiveClassName}
            />
          )}
        </NavLink>
      </nav>
    </Container>
  </header>
);
