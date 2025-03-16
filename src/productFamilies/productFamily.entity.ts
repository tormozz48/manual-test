import { ProductCategory } from 'src/productCategories/productCategory.entity';
import { Product } from 'src/products/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
