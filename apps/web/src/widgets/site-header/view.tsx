import { ConsoleMarker, Container } from '@shared/ui';

const brand = 'mcp_resume';
const mcpNavLabel = 'mcp';
const contactNavLabel = 'contact';
const navMarkerClassName =
  'text-content-base-tertiary group-hover:text-content-accent-hover';

export const SiteHeader = () => (
  <header className="border-b border-border-base-main/80">
    <Container className="flex items-center justify-between py-5">
      <ConsoleMarker variant="plain" label={brand} />
      <nav className="flex gap-4">
        <a href="#mcp" className="group">
          <ConsoleMarker
            variant="comment"
            label={mcpNavLabel}
            className={navMarkerClassName}
          />
        </a>
        <a href="#contact" className="group">
          <ConsoleMarker
            variant="comment"
            label={contactNavLabel}
            className={navMarkerClassName}
          />
        </a>
      </nav>
    </Container>
  </header>
);
