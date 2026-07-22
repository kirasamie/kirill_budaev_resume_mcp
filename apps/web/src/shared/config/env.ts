export const getMcpUrl = () =>
  import.meta.env.VITE_MCP_URL ?? `${window.location.origin}/mcp`;
