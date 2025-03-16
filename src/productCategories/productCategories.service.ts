import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './productCategory.entity';

@Injectable()
export class ProductCategoriesService {
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoriesRepository: Repository<ProductCategory>,
  ) {}

  findByCode(code: string): Promise<ProductCategory | null> {
    return this.productCategoriesRepository.findOneBy({ code });
  }
}
