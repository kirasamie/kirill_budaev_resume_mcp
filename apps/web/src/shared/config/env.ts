export const getMcpUrl = () =>
  import.meta.env.VITE_MCP_URL ?? `${window.location.origin}/mcp`;

export const getApiBaseUrl = () =>
  import.meta.env.VITE_API_BASE_URL ?? window.location.origin;
