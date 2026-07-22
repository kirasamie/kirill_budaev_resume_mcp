import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HealthModule } from './health';
import { McpModule } from './mcp';
import { StaticModule } from './static';
import { ThrottlerConfigModule } from './throttler-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HealthModule,
    McpModule,
    StaticModule,
    ThrottlerConfigModule,
  ],
})
export class AppModule {}
