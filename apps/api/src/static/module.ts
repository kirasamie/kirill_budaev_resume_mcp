import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const staticPath = join(__dirname, '..', '..', 'static');

@Module({
  imports: existsSync(staticPath)
    ? [
        ServeStaticModule.forRoot({
          rootPath: staticPath,
          exclude: ['/health', '/health/(.*)', '/mcp', '/mcp/(.*)'],
        }),
      ]
    : [],
})
export class StaticModule {}
