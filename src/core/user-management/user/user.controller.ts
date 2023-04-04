import { RequestSchema } from '@/decorator/request.decorator';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { User } from './user.dto';
import { Public } from '@/decorator/public.decorator';
import { Roles } from '@/decorator/role.decorator';
import { USER_ROLE } from '@/utils/constant';

@ApiTags('User API')
@Controller('user')
@Roles(USER_ROLE.ADMIN)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Public()
  @Roles()
  @Post('register')
  @RequestSchema(User)
  async create(@Body() user: User) {
    return this.userService.create(user);
  }

  @Post('register/admin')
  @RequestSchema(User)
  async createAdmin(@Body() user: User) {
    return this.userService.createAdminUser(user);
  }

  @Get(':email')
  async findOne(@Param('email') email: string): Promise<UserEntity | null> {
    return this.userService.findOne(email);
  }
}
