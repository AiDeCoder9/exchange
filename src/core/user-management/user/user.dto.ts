import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { IsDuplicate, Trim } from '@/decorator/transform.decorator';

import { ApiProperty } from '@nestjs/swagger';
import { GENDER_TYPE } from '@/utils/constant';
import { UserEntity } from './user.entity';

export class User {
  @IsOptional()
  @IsInt()
  @ApiProperty()
  id: number;

  @IsNotEmpty({ message: 'Name is Required' })
  @IsString()
  @ApiProperty()
  fullName: string;

  @IsNotEmpty({ message: 'Address is Required' })
  @IsString()
  @Trim()
  @MaxLength(100, { message: 'Address is too long' })
  @ApiProperty()
  address: string;

  @IsNotEmpty({ message: 'Email is Required' })
  @IsString()
  @Trim()
  @IsEmail()
  @MaxLength(100, { message: 'Email is too long' })
  @IsDuplicate(UserEntity, 'email')
  @ApiProperty()
  email: string;

  @IsNotEmpty({ message: 'Mobile No. is Required' })
  @IsString()
  @Trim()
  @Length(10, 10, { message: 'Mobile No. must be of 10 digits.' })
  @IsDuplicate(UserEntity, 'phone')
  @ApiProperty()
  phone: string;

  @IsNotEmpty({ message: 'Gender is Required' })
  @IsString()
  @Trim()
  @ApiProperty()
  @IsEnum(GENDER_TYPE)
  gender: GENDER_TYPE;
}

export class PreferencesRequest {
  @IsArray()
  @ArrayMinSize(5)
  categories: number[];
}
