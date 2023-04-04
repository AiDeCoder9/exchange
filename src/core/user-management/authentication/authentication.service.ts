import {
  Injectable,
  Dependencies,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
@Dependencies(UserService, JwtService)
export class AuthenticationService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {
    const user = await this.userService.findOne(email);

    if (user) {
      const match = await bcrypt.compare(pass, user?.password);
      if (!match) {
        throw new UnauthorizedException();
      }

      const payload = { username: user.email, sub: user.id, role: user.role };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      console.log('check');
      // throw new UnauthorizedException();
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
}
