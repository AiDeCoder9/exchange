import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { IsExists, ToUpperCase, Trim } from '@/decorator/transform.decorator';
import { IsDuplicate } from '@/decorator/transform.decorator';
import { CategoryEntity } from '../category.entity';

export class Category {
  @IsOptional()
  @IsInt()
  @IsExists(CategoryEntity, 'id')
  id: number;

  @IsNotEmpty()
  @IsString()
  @ToUpperCase()
  @IsDuplicate(CategoryEntity, 'name')
  name: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  @MaxLength(255)
  description: string;
}
