import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductFamily } from './productFamily.entity';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductFamily])],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
