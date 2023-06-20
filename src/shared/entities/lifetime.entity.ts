import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

//va permettre de faire le cycle de vie
export class LifeTimeEntity extends BaseEntity {
  @Exclude()
  @CreateDateColumn()
  createdAt: Date;
  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;
  @Exclude()
  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt: Date;
}
