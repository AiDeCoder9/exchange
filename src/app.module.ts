import { Module } from '@nestjs/common';

import { ConfigurationModule } from './config/config';
import { TypeORMConfigModule } from './config/typorm';

@Module({
  imports: [ConfigurationModule, TypeORMConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    console.log(process.env.PORT);
  }
}
