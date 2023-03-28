import { CommonEntityPrimary } from '@/resource/entity/primary.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'category' })
export class CategoryEntity extends CommonEntityPrimary {
  @Column({ name: 'name', length: 100, nullable: false })
  name: string;
  @Column({ name: 'description', length: 255, nullable: false })
  description: string;
}
