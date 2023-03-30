import { RequestSchema } from '@/decorator/request.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { User } from './user.dto';

@ApiTags('User API')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @RequestSchema(User)
  async create(@Body() user: User) {
    return this.userService.create(user);
  }

  @Get(':email')
  async findOne(@Param('email') email: string): Promise<UserEntity | null> {
    return this.userService.findOne(email);
  }
}
