import { Container } from '@shared/ui';

export const SiteHeader = () => (
  <header className="border-b border-slate-800/80">
    <Container className="flex items-center justify-between py-5">
      <span className="text-sm font-medium tracking-wide text-slate-300">
        MCP Resume
      </span>
      <nav className="flex gap-4 text-sm text-slate-400">
        <a href="#mcp" className="transition hover:text-sky-300">
          MCP
        </a>
        <a href="#contact" className="transition hover:text-sky-300">
          Контакты
        </a>
      </nav>
    </Container>
  </header>
);
