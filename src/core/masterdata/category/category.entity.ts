import { ProductEntity } from '@/core/product/product.entity';
import { UserEntity } from '@/core/user-management/user/user.entity';
import { CommonEntityPrimary } from '@/resource/entity/primary.entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

@Entity({ name: 'category' })
export class CategoryEntity extends CommonEntityPrimary {
  @Column({ name: 'name', length: 100, nullable: false })
  name: string;
  @Column({ name: 'description', length: 255, nullable: false })
  description: string;
  @ManyToOne(() => UserEntity, (user) => user.categories)
  user: UserEntity;
  @ManyToMany(() => ProductEntity, (product) => product.categories)
  products: ProductEntity[];
}
