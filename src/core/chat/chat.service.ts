import { UserService } from '@/core/user-management/user/user.service';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ChatRequest } from './chat.dto';
import { ChatEntity } from './chat.entity';
import { ProductService } from '../product/product.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private chatRepository: Repository<ChatEntity>,
    private productService: ProductService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  findAll(): Promise<ChatEntity[]> {
    return this.chatRepository.find();
  }
  async findByProductId(productId: number) {
    const chats = await this.productService.findProductChats(productId);
    console.log(chats);
    return chats;
  }
  async create(request: ChatRequest) {
    const chat = new ChatEntity();
    await this.userService.findById(+request.receiverId);
    const product = await this.productService.findById(+request.productId);
    const sender = await this.userService.findActiveUser();
    chat.message = request.message;
    chat.senderId = sender.id;
    chat.receiverId = request.receiverId;
    chat.product = product;

    await this.chatRepository.save(chat);
    console.log(request);
  }
}
