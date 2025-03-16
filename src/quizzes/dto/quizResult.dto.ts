import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from '../../products/dto/product.dto';
import { ProductFamilyDto } from '../../products/dto/productFamily.dto';

export class QuizResultDto {
  @ApiProperty({
    description: 'ID of the quiz result',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'List of recommended products based on quiz answers',
    type: [ProductDto],
  })
  products: ProductDto[];

  @ApiProperty({
    description:
      'List of product families that are excluded based on quiz answers',
    type: [ProductFamilyDto],
  })
  excludes: ProductFamilyDto[];
}
