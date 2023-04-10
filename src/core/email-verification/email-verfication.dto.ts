import { IsNotEmpty, IsString } from 'class-validator';
import { Trim } from '@/decorator/transform.decorator';

import { ApiProperty } from '@nestjs/swagger';

export class EmailVerificationConfirm {
  @IsNotEmpty({ message: 'Token is not required' })
  @IsString()
  @Trim()
  @ApiProperty()
  token: string;
}
