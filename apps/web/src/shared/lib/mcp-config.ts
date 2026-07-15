export const buildMcpConfigSnippet = (mcpUrl: string) =>
  JSON.stringify(
    {
      mcpServers: {
        portfolio: {
          url: mcpUrl,
        },
      },
    },
    null,
    2,
  );
