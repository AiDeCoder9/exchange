import { EmailVerificationModule } from '@/core/email-verification/email-verification.module';
import { CategoryEntity } from '@/core/masterdata/category/category.entity';
import { AsyncStorageModule } from '@/resource/module/async-storage.module';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    EmailVerificationModule,
    AsyncStorageModule,
    TypeOrmModule.forFeature([UserEntity, CategoryEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
