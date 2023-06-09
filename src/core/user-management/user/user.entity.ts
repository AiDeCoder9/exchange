import { CategoryEntity } from '@/core/masterdata/category/category.entity';
import { ProductEntity } from '@/core/product/product.entity';
import { CommonEntityPrimary } from '@/resource/entity/primary.entity';
import { GENDER_TYPE, USER_ROLE } from '@/utils/constant';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends CommonEntityPrimary {
  @Column({ name: 'fullName', length: 100, nullable: false })
  fullName: string;
  @Column({ name: 'address', length: 100, nullable: false })
  address: string;
  @Column({ name: 'email', length: 100, nullable: false })
  email: string;
  @Column({ name: 'phone', length: 10, nullable: false })
  phone: string;
  @Column({ name: 'gender', nullable: false })
  gender: GENDER_TYPE;
  @Column({ name: 'password', nullable: false })
  password: string;
  @Column({ name: 'role', nullable: false })
  role: USER_ROLE;
  @Column({ default: false })
  isEmailVerified: boolean;

  @ManyToMany(() => CategoryEntity)
  @JoinTable()
  categories: CategoryEntity[];

  @OneToMany(() => ProductEntity, (product) => product.user)
  products: ProductEntity[];
}
