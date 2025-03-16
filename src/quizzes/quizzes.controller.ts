import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { ReceiptService } from '../receipt/receipt.service';
import { Quiz } from './quiz.entity';
import { QuizDto } from './dto';
import { QuizSubmitDto } from './dto/quizSubmit.dto';
import { QuizResultDto } from './dto/quizResult.dto';

@Controller('quizzes')
export class QuizzesController {
  constructor(
    private readonly quizzesService: QuizzesService,
    private readonly receiptService: ReceiptService,
  ) {}

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

  @Post(':id/submit')
  async submit(
    @Param('id') id: number,
    @Body() body: QuizSubmitDto,
  ): Promise<QuizResultDto> {
    const quiz = await this.quizzesService.findOne(id);
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    return this.receiptService.generateReceiptFromQuiz(
      id,
      body.answers.map((answer) => answer.id),
    );
  }
}
