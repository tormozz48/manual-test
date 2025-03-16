import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './quiz.entity';
import { Question } from './question.entity';
import { Answer } from './answer.entity';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { ProductCategoriesModule } from '../productCategories/productCategories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quiz, Question, Answer]),
    ProductCategoriesModule,
  ],
  providers: [QuizzesService],
  controllers: [QuizzesController],
  exports: [QuizzesService],
})
export class QuizzesModule {}
