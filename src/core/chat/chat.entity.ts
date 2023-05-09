import { ProductEntity } from '@/core/product/product.entity';
import { CommonEntityPrimary } from '@/resource/entity/primary.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'chat' })
export class ChatEntity extends CommonEntityPrimary {
  @Column({ name: 'message', length: 255, nullable: false })
  message: string;
  @Column({ name: 'senderId', nullable: false })
  senderId: number;
  @Column({ name: 'receiverId', nullable: false })
  receiverId: number;
  @ManyToOne(() => ProductEntity, (product) => product.chats)
  product: ProductEntity;
}
