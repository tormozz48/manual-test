import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { ProductCategory } from '../productCategories/productCategory.entity';
import { Product } from './product.entity';
import { AnswerReceipt } from '../receipt/answerReceipt.entity';

@Entity()
export class ProductFamily {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @ManyToOne('ProductCategory', 'productFamilies')
  @JoinColumn({ name: 'categoryId' })
  category: ProductCategory;

  @Column()
  categoryId: number;

  @OneToMany('Product', 'family')
  products: Product[];

  @ManyToMany('AnswerReceipt', 'excludes')
  answerReceipts: AnswerReceipt[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
