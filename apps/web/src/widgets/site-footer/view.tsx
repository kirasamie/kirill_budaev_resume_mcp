import { Container } from '@shared/ui';

export const SiteFooter = () => (
  <footer className="border-t border-slate-800/80 py-8">
    <Container>
      <p className="text-sm text-slate-500">
        Резюме доступно AI-ассистентам через MCP tools и resource{' '}
        <code className="text-slate-400">profile://resume</code>.
      </p>
    </Container>
  </footer>
);
