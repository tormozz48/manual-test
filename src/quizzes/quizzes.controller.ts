import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { Quiz } from './quiz.entity';
import { QuizDto } from './dto';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Get()
  findAll(): Promise<Quiz[]> {
    return this.quizzesService.findAll();
  }

  @Get('category/:code')
  async findByCategory(@Param('code') categoryCode: string): Promise<QuizDto> {
    const quiz = await this.quizzesService.findByCategory(categoryCode);
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    return quiz;
  }
}
