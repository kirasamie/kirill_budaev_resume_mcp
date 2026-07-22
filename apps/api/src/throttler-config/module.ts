import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { THROTTLER_LIMITS } from '../shared/constants';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [THROTTLER_LIMITS.DEFAULT],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class ThrottlerConfigModule {}
