import {
  GetProjectDetailsInputSchema,
  ListProjectsInputSchema,
  SearchSkillsInputSchema,
} from '@portfolio/domain';

import type { ToolsService } from '../../tools';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { MimeType, ResourceUri } from '../constants';
import { generateContent, generateResourceContent } from './content';

export const registerMcpHandlers = (
  server: McpServer,
  tools: ToolsService,
): void => {
  server.registerTool(
    'get_profile',
    {
      title: 'Get profile',
      description: 'Returns candidate profile summary',
    },
    async () => ({
      content: generateContent(tools.getProfile()),
    }),
  );

  server.registerTool(
    'get_contact_info',
    {
      title: 'Get contact info',
      description: 'Returns contact details',
    },
    async () => ({
      content: generateContent(tools.getContact()),
    }),
  );

  server.registerTool(
    'get_experience',
    {
      title: 'Get experience',
      description: 'Returns work experience list',
    },
    async () => ({
      content: generateContent(tools.getExperience()),
    }),
  );

  server.registerTool(
    'list_projects',
    {
      title: 'List projects',
      description: 'Filter projects by tech and/or status',
      inputSchema: ListProjectsInputSchema,
    },
    async (input) => ({
      content: generateContent(tools.listProjects(input)),
    }),
  );

  server.registerTool(
    'get_project_details',
    {
      title: 'Get project details',
      description:
        'Find project by name; ambiguous match returns list of names',
      inputSchema: GetProjectDetailsInputSchema,
    },
    async (input) => ({
      content: generateContent(tools.getProjectDetails(input)),
    }),
  );

  server.registerTool(
    'search_skills',
    {
      title: 'Search skills',
      description: 'Search skills by query and optional category',
      inputSchema: SearchSkillsInputSchema,
    },
    async (input) => ({
      content: generateContent(tools.searchSkills(input)),
    }),
  );

  server.registerResource(
    'resume',
    ResourceUri.Resume,
    {
      title: 'Resume markdown',
      description: 'Full resume in markdown',
      mimeType: MimeType.Markdown,
    },
    async () =>
      generateResourceContent(ResourceUri.Resume, tools.getResumeMarkdown()),
  );
};
