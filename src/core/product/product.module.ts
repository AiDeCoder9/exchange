import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user-management/user/user.module';
import { ProductController } from './product.controller';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';
import { CategoryModule } from '../masterdata/category/category.module';
import { diskStorage } from 'multer';
import * as path from 'path';

@Module({
  imports: [
    UserModule,
    CategoryModule,
    TypeOrmModule.forFeature([ProductEntity]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        storage: diskStorage({
          destination: path.resolve(
            __dirname,
            '..',
            configService.get<MulterConfig>('multer')?.destination ?? '',
          ),
          filename: (_req, file, cb) => {
            const fileName = path
              .parse(file.originalname)
              .name.replace(/\s/g, '');
            const extension = path.parse(file.originalname).ext;
            cb(null, `${fileName}${extension}`);
          },
        }),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
