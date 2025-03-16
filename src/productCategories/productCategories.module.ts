import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './productCategory.entity';
import { ProductCategoriesService } from './productCategories.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory])],
  providers: [ProductCategoriesService],
  exports: [ProductCategoriesService],
})
export class ProductCategoriesModule {}
