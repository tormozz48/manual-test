import { ProductDto } from '../../products/dto/product.dto';
import { ProductFamilyDto } from '../../products/dto/productFamily.dto';

export class QuizResultDto {
  id: number;
  products: ProductDto[];
  excludes: ProductFamilyDto[];
}
