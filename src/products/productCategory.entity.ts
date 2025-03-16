import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Product } from './product.entity';
import { ProductFamily } from './productFamily.entity';
import { Quiz } from '../quizzes/quiz.entity';

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column({ unique: false })
  name: string;

  @OneToMany(() => ProductFamily, (productFamily) => productFamily.category)
  productFamilies: ProductFamily[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @OneToMany(() => Quiz, (quiz) => quiz.category)
  quizzes: Quiz[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
