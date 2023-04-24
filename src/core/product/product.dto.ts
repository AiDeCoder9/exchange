import { IsDuplicate, Trim } from '@/decorator/transform.decorator';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsBooleanString,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
  ValidateIf,
} from 'class-validator';
import { ProductEntity } from './product.entity';

export class ProductCreateRequest {
  @IsNotEmpty({ message: 'Name is Required' })
  @IsString()
  @Trim()
  @IsDuplicate(ProductEntity, 'name')
  @MaxLength(100)
  @ApiProperty()
  name: string;

  @IsNotEmpty({ message: 'Description is Required' })
  @IsString()
  @Trim()
  @MaxLength(255)
  @ApiProperty()
  description: string;

  @IsNotEmpty({ message: 'Price is Required' })
  @IsNumberString()
  @Trim()
  @ApiProperty()
  price: number;

  @IsNotEmpty({ message: 'Delivery Option must be determined' })
  @IsBooleanString()
  @ApiProperty()
  delivery: boolean;

  @ValidateIf((product) => product.delivery === 'true')
  @IsNotEmpty({ message: 'Mention Delivery Charge' })
  @IsNumberString()
  @ApiProperty()
  deliveryCharge: number;

  @ValidateIf((product) => product.delivery === 'true')
  @IsNotEmpty({ message: 'Mention Delivery Location' })
  @IsString()
  @Trim()
  @MaxLength(255)
  @ApiProperty()
  deliveryLocation: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
  })
  files: Array<Express.Multer.File>;
}
