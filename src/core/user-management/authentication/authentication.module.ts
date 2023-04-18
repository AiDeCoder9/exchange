import { Module } from '@nestjs/common';

import { AuthenticationService } from './authentication.service';
import { UserModule } from '../user/user.module';
import { AuthenticationController } from './authentication.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@/utils/constant';
import { LocalStrategy } from '@/strategies/local.strategy';
import { JwtStrategy } from '@/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AsyncStorageModule } from '@/resource/module/async-storage.module';

@Module({
  imports: [
    UserModule,
    AsyncStorageModule,
    PassportModule.register({ defaultStrategy: 'local' }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
