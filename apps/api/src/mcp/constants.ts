export const ContentType = {
  Text: 'text',
} as const;

export const MimeType = {
  Markdown: 'text/markdown',
} as const;

export const ResourceUri = {
  Resume: 'profile://resume',
} as const;

/** Required by Streamable HTTP transport — without it SDK returns 406 */
export const McpAcceptHeader = 'application/json, text/event-stream' as const;