import { EmailVerificationModule } from '@/core/email-verification/email-verification.module';
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
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
