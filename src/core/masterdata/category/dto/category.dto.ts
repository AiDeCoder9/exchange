import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { IsExists, Trim } from '@/decorator/transform.decorator';
import { IsDuplicate } from '@/decorator/transform.decorator';
import { CategoryEntity } from '../category.entity';
import { ApiProperty } from '@nestjs/swagger';

export class Category {
  @IsOptional()
  @IsInt()
  @IsExists(CategoryEntity, 'id')
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @IsString()
  @IsDuplicate(CategoryEntity, 'name')
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  @MaxLength(255)
  @ApiProperty()
  description: string;
}
