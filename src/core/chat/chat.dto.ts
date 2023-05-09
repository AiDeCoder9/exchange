import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ChatRequest {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  message: string;

  @IsNotEmpty()
  @ApiProperty()
  receiverId: number;

  @IsNotEmpty()
  @ApiProperty()
  productId: number;
}
