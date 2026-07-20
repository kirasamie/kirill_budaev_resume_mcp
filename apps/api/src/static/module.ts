import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const webDistPath = join(__dirname, '..', '..', '..', 'web', 'dist');

@Module({
  imports: existsSync(webDistPath)
    ? [
        ServeStaticModule.forRoot({
          rootPath: webDistPath,
          exclude: ['/health/(.*)', '/mcp/(.*)'],
        }),
      ]
    : [],
})
export class StaticModule {}
