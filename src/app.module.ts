import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { ConfigurationModule } from './config/config';
import { TypeORMConfigModule } from './config/typorm';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RolesGuard } from './guard/role.guard';

@Module({
  imports: [ConfigurationModule, TypeORMConfigModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
