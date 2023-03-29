import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ModuleList from '@/resource/module';
import { DataSource } from 'typeorm';

import { connection, databaseConnection } from './database.config';
import DatabaseProvider from '@/providers/database-provider';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...databaseConnection(),
      }),
    }),
    ...ModuleList,
  ],
  providers: [],
})
export class TypeORMConfigModule {
  constructor(public connection: DataSource) {}
}
