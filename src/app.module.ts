import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { ConfigurationModule } from './config/config';
import { TypeORMConfigModule } from './config/typorm';
import DatabaseProvider from './providers/database-provider';

@Module({
  imports: [ConfigurationModule, TypeORMConfigModule],
  controllers: [],
  providers: [DatabaseProvider],
  exports: ['DATABASE_CONNECTION'],
})
export class AppModule {
  constructor(public connection: DataSource) {
    console.log(process.env.PORT);
  }
}
