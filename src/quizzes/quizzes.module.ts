import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './quiz.entity';
import { Question } from './question.entity';
import { Answer } from './answer.entity';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { ProductCategoriesModule } from '../productCategories/productCategories.module';
import { ReceiptModule } from '../receipt/receipt.module';
import { Product } from '../products/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quiz, Question, Answer, Product]),
    ProductCategoriesModule,
    ReceiptModule,
  ],
  providers: [QuizzesService],
  controllers: [QuizzesController],
  exports: [QuizzesService],
})
export class QuizzesModule {}
