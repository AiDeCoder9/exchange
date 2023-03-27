import { Module } from '@nestjs/common';

import { CategoryController } from './category/category.controller';
import { ConfigurationModule } from './config/config';
import { TypeORMConfigModule } from './config/typorm';
import { CategoryService } from './category/category.service';

@Module({
  imports: [ConfigurationModule, TypeORMConfigModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class AppModule {
  constructor() {
    console.log(process.env.PORT);
  }
}
