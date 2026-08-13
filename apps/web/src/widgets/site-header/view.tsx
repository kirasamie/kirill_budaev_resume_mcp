import { Container } from '@shared/ui';

export const SiteHeader = () => (
  <header className="border-b border-border-base-main/80">
    <Container className="flex items-center justify-between py-5">
      <span className="text-sm font-medium tracking-wide text-content-base-secondary">
        MCP Resume
      </span>
      <nav className="flex gap-4 text-sm text-content-base-tertiary">
        <a
          href="#mcp"
          className="transition hover:text-content-accent-hover"
        >
          MCP
        </a>
        <a
          href="#contact"
          className="transition hover:text-content-accent-hover"
        >
          Контакты
        </a>
      </nav>
    </Container>
  </header>
);
