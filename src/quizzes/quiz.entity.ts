import { ProductCategory } from '../productCategories/productCategory.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne('ProductCategory', 'quizzes')
  @JoinColumn({ name: 'categoryId' })
  category: ProductCategory;

  @Column()
  categoryId: number;

  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
