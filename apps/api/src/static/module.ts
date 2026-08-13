import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { existsSync } from 'fs';
import { join } from 'path';

const staticPath = join(__dirname, '..', '..', 'static');

@Module({
  imports: existsSync(staticPath)
    ? [
        ServeStaticModule.forRoot({
          rootPath: staticPath,
          exclude: ['/health{/*path}', '/mcp{/*path}'],
          // SPA: unknown paths (e.g. /resume) → index.html
          renderPath: '/{*path}',
        }),
      ]
    : [],
})
export class StaticModule {}
