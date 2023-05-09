import { RequestSchema } from '@/decorator/request.decorator';
import { Roles } from '@/decorator/role.decorator';

import { USER_ROLE } from '@/utils/constant';
import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatRequest } from './chat.dto';
import { ChatService } from './chat.service';
import { ChatEntity } from './chat.entity';

@ApiTags('Chat API')
@Controller('chat')
@Roles(USER_ROLE.GENERAL)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('send')
  @RequestSchema(ChatRequest)
  async create(@Body() request: ChatRequest) {
    return this.chatService.create(request);
  }

  @Get('detail/:id')
  async chatsForProduct(@Param('id') id: number) {
    return this.chatService.findByProductId(id);
  }
}
