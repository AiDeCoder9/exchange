import {
  Injectable,
  Dependencies,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

import { SetPasswordRequest } from './authentication.dto';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,

    private configService: ConfigService,
  ) {}

  async login(email: string, pass: string) {
    const user = await this.userService.findOne(email);

    if (user) {
      const payload = { username: user.email, sub: user.id, role: user.role };
      const match = await bcrypt.compare(pass, user?.password);
      if (!match) {
        throw new UnauthorizedException();
      }
      if (user.isEmailVerified) {
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      } else {
        const tokenConfig = this.configService.get<TokenConfig>('token');
        const token = await this.jwtService.signAsync(payload, {
          secret: tokenConfig?.secret,
          expiresIn: tokenConfig?.expiry,
        });
        return {
          access_token: token,
        };
      }
    } else {
      throw new UnauthorizedException();
    }
  }
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);

    if (user) {
      const match = await bcrypt.compare(pass, user.password);
      if (match) {
        const { password, ...result } = user;
        return result;
      }
    }

    return null;
  }
  async setPassword(requestData: SetPasswordRequest) {
    //console.log(this.request.headers['authorization']);
    if (requestData.newPassword !== requestData.confirmPassword) {
      throw new BadRequestException('New and Confirm Password is not equal');
    }
    console.log(this.userService.getUserId());
    console.log(requestData);
  }
}
