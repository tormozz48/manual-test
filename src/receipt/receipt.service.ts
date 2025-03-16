import { Injectable } from '@nestjs/common';
import { Product } from '../products/product.entity';
import { QuizResultDto } from '../quizzes/dto/quizResult.dto';
import { ProductDto } from '../products/dto/product.dto';

@Injectable()
export class ReceiptService {
  constructor() {}

  async generateReceiptFromQuiz(
    quizId: number,
    answerIds: number[],
  ): Promise<QuizResultDto> {
    console.log(answerIds);

    // Add await to make this truly async
    const recommendedProducts = await Promise.resolve([]);

    // Map products to DTOs
    const productDtos = recommendedProducts.map((product) =>
      this.mapToProductDto(product),
    );

    return {
      id: quizId,
      products: productDtos,
    };
  }

  /**
   * Map a Product entity to a ProductDto
   * @param product The product entity
   * @returns A ProductDto
   */
  private mapToProductDto(product: Product): ProductDto {
    return {
      id: product.id,
      name: product.name,
      doze: product.doze,
      unit: product.unit,
      categoryId: product.categoryId,
      familyId: product.familyId,
    };
  }
}
