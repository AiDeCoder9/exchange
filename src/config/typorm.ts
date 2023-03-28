import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConnection } from './database.config';
import ModuleList from '@/resource/module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...databaseConnection(),
      autoLoadEntities: true,
      synchronize: true,
    }),
    ...ModuleList,
  ],
})
export class TypeORMConfigModule {}
