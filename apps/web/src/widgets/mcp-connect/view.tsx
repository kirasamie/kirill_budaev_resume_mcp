import { CopyMcpConfigButton } from '@features/copy-mcp-config';
import { getMcpUrl } from '@shared/config';
import { buildMcpConfigSnippet } from '@shared/lib';
import { ConsoleSection, Container, KeyValue } from '@shared/ui';

const sectionTitle = 'connect_mcp';
const mcpDescription =
  'AI-клиенты (Cursor, Claude Desktop и др.) могут читать резюме через MCP-сервер.';
const endpointLabel = 'endpoint';
const configLabel = 'config';
const configPath = '.cursor/mcp.json';

export const McpConnect = () => {
  const mcpUrl = getMcpUrl();
  const configSnippet = buildMcpConfigSnippet(mcpUrl);

  return (
    <Container>
      <ConsoleSection
        id="mcp"
        title={sectionTitle}
        description={mcpDescription}
      >
        <div className="space-y-5 rounded-xl border border-border-base-main bg-surface/50 p-6">
          <KeyValue label={endpointLabel}>
            <code className="break-all font-mono text-sm text-content-accent-default">
              {mcpUrl}
            </code>
          </KeyValue>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <KeyValue label={configLabel} value={configPath} />
              <CopyMcpConfigButton config={configSnippet} />
            </div>
            <pre className="overflow-x-auto rounded-lg border border-border-base-main bg-main px-4 py-3 font-mono text-sm leading-relaxed text-content-base-secondary">
              {configSnippet}
            </pre>
          </div>
        </div>
      </ConsoleSection>
    </Container>
  );
};
