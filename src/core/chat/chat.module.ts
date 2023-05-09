import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatEntity } from './chat.entity';
import { UserModule } from '../user-management/user/user.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    ProductModule,
    TypeOrmModule.forFeature([ChatEntity]),
  ],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
