import { UserEntity } from '@/core/user-management/user/user.entity';
import { CommonEntityPrimary } from '@/resource/entity/primary.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'product' })
export class ProductEntity extends CommonEntityPrimary {
  @Column({ name: 'name', length: 100, nullable: false })
  name: string;
  @Column({ name: 'description', length: 255, nullable: false })
  description: string;
  @Column({ name: 'price', length: 255, nullable: false })
  price: string;
  @Column('simple-array')
  files: string[];
  @ManyToOne(() => UserEntity, (user) => user.products)
  user: UserEntity;
}
