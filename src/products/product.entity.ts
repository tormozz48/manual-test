import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { ProductCategory } from './productCategory.entity';
import { ProductFamily } from './productFamily.entity';
import { AnswerReceipt } from '../receipt/answerReceipt.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  doze: number;

  @Column()
  unit: string;

  @ManyToOne('ProductCategory', 'products')
  @JoinColumn({ name: 'categoryId' })
  category: ProductCategory;

  @Column()
  categoryId: number;

  @ManyToOne('ProductFamily', 'products')
  @JoinColumn({ name: 'familyId' })
  family: ProductFamily;

  @Column({ nullable: true })
  familyId: number;

  @ManyToMany('AnswerReceipt', 'products')
  answerReceipts: AnswerReceipt[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
