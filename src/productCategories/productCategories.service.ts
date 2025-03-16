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

  findOne(id: number): Promise<ProductCategory | null> {
    return this.productCategoriesRepository.findOne({
      where: { id },
      relations: ['productFamilies'],
    });
  }

  findByCode(code: string): Promise<ProductCategory | null> {
    return this.productCategoriesRepository.findOneBy({ code });
  }
}
