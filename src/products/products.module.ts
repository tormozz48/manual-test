import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductFamily } from './productFamily.entity';
import { ProductCategoriesService } from './productCategories.service';
import { ProductCategory } from './productCategory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductFamily, ProductCategory]),
  ],
  providers: [ProductCategoriesService],
  exports: [ProductCategoriesService],
})
export class ProductsModule {}
