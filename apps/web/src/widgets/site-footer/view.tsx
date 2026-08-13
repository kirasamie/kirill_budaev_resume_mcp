import { Container, KeyValue } from '@shared/ui';

const resourceLabel = 'resource';
const resourceUri = 'profile://resume';

export const SiteFooter = () => (
  <footer className="border-t border-border-base-main/80 py-8">
    <Container>
      <KeyValue label={resourceLabel}>
        <code className="font-mono text-content-base-secondary">
          {resourceUri}
        </code>
      </KeyValue>
    </Container>
  </footer>
);
