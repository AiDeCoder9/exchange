import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@/decorator/public.decorator';
import { Roles } from '@/decorator/role.decorator';

import { EmailVerificationService } from './email-verification.service';

@ApiTags('Email Verification')
@Controller('email-verification')
export class EmailVerificationController {
  constructor(
    private readonly emailVerificationService: EmailVerificationService,
  ) {}
  @Public()
  @Roles()
  @Get(':token')
  async confirm(@Param('token') token: string): Promise<void> {
    return this.emailVerificationService.markEmailAsVerified(token);
  }
}
