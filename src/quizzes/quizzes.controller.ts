import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { ReceiptService } from '../receipt/receipt.service';
import { QuizDto } from './dto';
import { QuizSubmitDto } from './dto/quizSubmit.dto';
import { QuizResultDto } from './dto/quizResult.dto';

@Controller('quizzes')
export class QuizzesController {
  constructor(
    private readonly quizzesService: QuizzesService,
    private readonly receiptService: ReceiptService,
  ) {}

  @Get('category/:code')
  async findByCategory(@Param('code') categoryCode: string): Promise<QuizDto> {
    const quiz = await this.quizzesService.findByCategory(categoryCode);
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    return quiz;
  }

  @Post(':id/submit')
  @HttpCode(200)
  async submit(
    @Param('id') id: number,
    @Body() body: QuizSubmitDto,
  ): Promise<QuizResultDto> {
    const quiz = await this.quizzesService.findOne(id);
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    return this.receiptService.generateReceiptFromQuiz(
      quiz,
      body.answers.map((answer) => answer.id),
    );
  }
}
