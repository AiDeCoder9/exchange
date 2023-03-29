import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ModuleList from '@/resource/module';

import { databaseConnection } from './database.config';
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
export class TypeORMConfigModule {}
