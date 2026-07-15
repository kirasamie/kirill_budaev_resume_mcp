import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

import { ContentType, MimeType } from '../constants';

export const generateContent = (data: unknown): CallToolResult['content'] => [
  {
    type: ContentType.Text,
    text: JSON.stringify(data),
  },
];

export const generateResourceContent = (uri: string, text: string) => ({
  contents: [
    {
      uri,
      mimeType: MimeType.Markdown,
      text,
    },
  ],
});
