import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './quiz.entity';
import { Question } from './question.entity';
import { Answer } from './answer.entity';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { ReceiptModule } from '../receipt/receipt.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quiz, Question, Answer]),
    ProductsModule,
    ReceiptModule,
  ],
  providers: [QuizzesService],
  controllers: [QuizzesController],
  exports: [],
})
export class QuizzesModule {}
