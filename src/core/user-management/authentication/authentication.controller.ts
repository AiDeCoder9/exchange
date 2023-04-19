import { Public } from '@/decorator/public.decorator';

import { JwtAuthGuard } from '@/guard/jwt-auth.guard';
import { LocalAuthGuard } from '@/guard/local.guard';
import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
  Headers,
} from '@nestjs/common';

import { LoginRequest, SetPasswordRequest } from './authentication.dto';
import { AuthenticationService } from './authentication.service';

@Controller()
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async signIn(@Body() loginRequest: LoginRequest) {
    return this.authService.login(loginRequest.email, loginRequest.password);
  }
  @HttpCode(HttpStatus.OK)
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout() {
    return this.authService.logout();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
  @Public()
  @Post('set-password')
  async setPassword(@Body() setPasswordRequest: SetPasswordRequest) {
    return this.authService.setPassword(setPasswordRequest);
  }
}
