import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Trim } from '@/decorator/transform.decorator';

import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @IsNotEmpty({ message: 'Email is Required' })
  @IsString()
  @Trim()
  @IsEmail()
  @MaxLength(100, { message: 'Email is too long' })
  @ApiProperty()
  email: string;

  @IsNotEmpty({ message: 'Password is Required' })
  @IsString()
  @Trim()
  @ApiProperty()
  password: string;
}

export class SetPasswordRequest {
  @IsNotEmpty({ message: 'Password is Required' })
  @IsString()
  @Trim()
  @ApiProperty()
  oldPassword: string;

  @IsNotEmpty({ message: 'Password is Required' })
  @IsString()
  @Trim()
  @ApiProperty()
  newPassword: string;

  @IsNotEmpty({ message: 'Password is Required' })
  @IsString()
  @Trim()
  @ApiProperty()
  confirmPassword: string;
}
