import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Answer } from '../quizzes/answer.entity';
import { Product } from '../products/product.entity';
import { ProductFamily } from '../products/productFamily.entity';

@Entity()
export class AnswerReceipt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  excludeAll: boolean;

  @OneToOne('Answer', 'receipt')
  @JoinColumn({ name: 'answerId' })
  answer: Answer;

  @Column()
  answerId: number;

  @ManyToMany('Product')
  @JoinTable({
    name: 'answer_receipt_products',
    joinColumn: {
      name: 'answerReceiptId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'productId',
      referencedColumnName: 'id',
    },
  })
  products: Product[];

  @ManyToMany('ProductFamily')
  @JoinTable({
    name: 'answer_receipt_product_families',
    joinColumn: {
      name: 'answerReceiptId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'productFamilyId',
      referencedColumnName: 'id',
    },
  })
  excludes: ProductFamily[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
