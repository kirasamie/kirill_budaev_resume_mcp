import { CopyMcpConfigButton } from '@features/copy-mcp-config';
import { getMcpUrl } from '@shared/config';
import { buildMcpConfigSnippet } from '@shared/lib';
import { Container, Section } from '@shared/ui';

export const McpConnect = () => {
  const mcpUrl = getMcpUrl();
  const configSnippet = buildMcpConfigSnippet(mcpUrl);

  return (
    <Container>
      <Section
        id="mcp"
        title="Подключить MCP"
        description="AI-клиенты (Cursor, Claude Desktop и др.) могут читать резюме через MCP-сервер."
      >
        <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/50 p-6">
          <div>
            <p className="mb-2 text-sm font-medium text-slate-300">Endpoint</p>
            <code className="block overflow-x-auto rounded-lg bg-slate-950 px-4 py-3 text-sm text-sky-300">
              {mcpUrl}
            </code>
          </div>

          <div>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-medium text-slate-300">
                Пример <code className="text-sky-300">.cursor/mcp.json</code>
              </p>
              <CopyMcpConfigButton config={configSnippet} />
            </div>
            <pre className="overflow-x-auto rounded-lg bg-slate-950 px-4 py-3 text-sm leading-relaxed text-slate-300">
              {configSnippet}
            </pre>
          </div>
        </div>
      </Section>
    </Container>
  );
};
