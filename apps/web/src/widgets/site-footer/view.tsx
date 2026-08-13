import { Container } from '@shared/ui';

export const SiteFooter = () => (
  <footer className="border-t border-border-base-main/80 py-8">
    <Container>
      <p className="text-sm text-content-base-tertiary">
        Резюме доступно AI-ассистентам через MCP tools и resource
        <code className="text-content-base-secondary">profile://resume</code>.
      </p>
    </Container>
  </footer>
);
