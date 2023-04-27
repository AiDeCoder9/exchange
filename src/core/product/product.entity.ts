import { UserEntity } from '@/core/user-management/user/user.entity';
import { CommonEntityPrimary } from '@/resource/entity/primary.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { CategoryEntity } from '../masterdata/category/category.entity';

@Entity({ name: 'product' })
export class ProductEntity extends CommonEntityPrimary {
  @Column({ name: 'name', length: 100, nullable: false })
  name: string;
  @Column({ name: 'description', length: 255, nullable: false })
  description: string;
  @Column({ name: 'price', type: 'bigint', nullable: false })
  price: number;

  @Column({ type: 'boolean' })
  delivery: boolean;

  @Column({ type: 'bigint', nullable: true })
  deliveryCharge: number;

  @Column({ type: 'boolean', nullable: true, default: true })
  available: boolean;

  @Column({ name: 'deliveryLocation', length: 100, nullable: true })
  deliveryLocation: string;

  @Column('simple-array')
  files: string[];
  @ManyToOne(() => UserEntity, (user) => user.products)
  user: UserEntity;

  @ManyToMany(() => CategoryEntity, (category) => category.products)
  @JoinTable()
  categories: CategoryEntity[];
}
