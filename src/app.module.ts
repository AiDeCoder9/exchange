import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { ConfigurationModule } from './config/config';
import { TypeORMConfigModule } from './config/typorm';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RolesGuard } from './guard/role.guard';
import { AuthMiddleware } from './middleware/auth-middleware';
import { AsyncStorageModule } from './resource/module/async-storage.module';

@Module({
  imports: [ConfigurationModule, TypeORMConfigModule, AsyncStorageModule],
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'login', method: RequestMethod.POST })
      .forRoutes('*');
  }
}
