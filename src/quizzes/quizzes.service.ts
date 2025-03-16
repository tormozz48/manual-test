import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './quiz.entity';
import { Question } from './question.entity';
import { Answer } from './answer.entity';
import { QuizDto, QuestionDto, AnswerDto } from './dto';
import { ProductCategoriesService } from '../products/productCategories.service';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private quizzesRepository: Repository<Quiz>,
    private productCategoriesService: ProductCategoriesService,
  ) {}

  async findOne(id: number): Promise<Quiz | null> {
    return this.quizzesRepository.findOne({
      where: { id },
    });
  }

  async findByCategory(categoryCode: string): Promise<QuizDto | null> {
    const category =
      await this.productCategoriesService.findByCode(categoryCode);

    if (!category) {
      return null;
    }

    const quiz = await this.quizzesRepository.findOne({
      where: { categoryId: category.id },
      relations: ['questions', 'questions.answers'],
    });

    if (!quiz) {
      return null;
    }

    return this.mapQuizToDto(quiz);
  }

  private mapQuizToDto(quiz: Quiz): QuizDto {
    return {
      id: quiz.id,
      name: quiz.name,
      categoryId: quiz.categoryId,
      questions: (quiz.questions ?? [])
        .map((question) => this.mapQuestionToDto(question))
        .sort((q1, q2) => q1.code.localeCompare(q2.code)),
    };
  }

  private mapQuestionToDto(question: Question): QuestionDto {
    return {
      id: question.id,
      code: question.code,
      name: question.name,
      quizId: question.quizId,
      answers: (question.answers ?? [])
        .map((answer) => this.mapAnswerToDto(answer))
        .sort((a1, a2) => a1.id - a2.id),
    };
  }

  private mapAnswerToDto(answer: Answer): AnswerDto {
    return {
      id: answer.id,
      name: answer.name,
      questionId: answer.questionId,
      nextQuestionId: answer.nextQuestionId,
    };
  }
}
