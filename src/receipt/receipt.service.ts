import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../products/product.entity';
import { QuizResultDto } from '../quizzes/dto/quizResult.dto';
import { ProductDto } from '../products/dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerReceipt } from '../receipt/answerReceipt.entity';
import { Repository } from 'typeorm/repository/Repository';
import { In } from 'typeorm';
import { Quiz } from '../quizzes/quiz.entity';
import { ProductCategoriesService } from '../products/productCategories.service';
import { ProductFamilyDto } from '../products/dto/productFamily.dto';
import { ProductFamily } from '../products/productFamily.entity';

@Injectable()
export class ReceiptService {
  constructor(
    @InjectRepository(AnswerReceipt)
    private answerReceiptRepository: Repository<AnswerReceipt>,
    private productCategoriesService: ProductCategoriesService,
  ) {}

  async generateReceiptFromQuiz(
    quiz: Quiz,
    answerIds: number[],
  ): Promise<QuizResultDto> {
    const category = await this.productCategoriesService.findOne(
      quiz.categoryId,
    );
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const answerReceipts = await this.answerReceiptRepository.find({
      where: { answerId: In(answerIds) },
      relations: ['products', 'excludes'],
    });
    const needExludeAll = answerReceipts.some(
      (answerReceipt) => answerReceipt.excludeAll,
    );
    if (needExludeAll) {
      return {
        id: quiz.id,
        products: [],
        excludes: category.productFamilies.map((family) =>
          this.mapToProductFamilyDto(family),
        ),
      };
    }

    const productDtos = answerReceipts.flatMap((answerReceipt) =>
      answerReceipt.products.map((product) => this.mapToProductDto(product)),
    );
    const excludeDtos = answerReceipts.flatMap((answerReceipt) =>
      answerReceipt.excludes.map((productFamily) =>
        this.mapToProductFamilyDto(productFamily),
      ),
    );

    return {
      id: quiz.id,
      products: productDtos,
      excludes: excludeDtos,
    };
  }

  private mapToProductDto(product: Product): ProductDto {
    return {
      id: product.id,
      name: product.name,
      doze: product.doze,
      unit: product.unit,
      title: `${product.name} ${product.doze}${product.unit}`,
      categoryId: product.categoryId,
      familyId: product.familyId,
    };
  }

  private mapToProductFamilyDto(
    productFamily: ProductFamily,
  ): ProductFamilyDto {
    return {
      id: productFamily.id,
      code: productFamily.code,
      name: productFamily.name,
      categoryId: productFamily.categoryId,
    };
  }
}
