import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import { QuizzesService } from './quizzes.service';
import { ReceiptService } from '../receipt/receipt.service';
import { QuizDto } from './dto';
import { QuizSubmitDto } from './dto/quizSubmit.dto';
import { QuizResultDto } from './dto/quizResult.dto';

@ApiTags('Quizzes')
@Controller('quizzes')
export class QuizzesController {
  constructor(
    private readonly quizzesService: QuizzesService,
    private readonly receiptService: ReceiptService,
  ) {}

  @Get('category/:code')
  @ApiOperation({ summary: 'Get quiz by category code' })
  @ApiParam({
    name: 'code',
    description: 'Category code of the quiz',
    example: 'ED',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the quiz for the specified category',
    type: QuizDto,
  })
  @ApiResponse({ status: 404, description: 'Quiz not found' })
  async findByCategory(@Param('code') categoryCode: string): Promise<QuizDto> {
    const quiz = await this.quizzesService.findByCategory(categoryCode);
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    return quiz;
  }

  @Post(':id/submit')
  @HttpCode(200)
  @ApiOperation({ summary: 'Submit quiz answers' })
  @ApiParam({ name: 'id', description: 'ID of the quiz', example: 1 })
  @ApiBody({ type: QuizSubmitDto, description: 'Quiz answers submission' })
  @ApiResponse({
    status: 200,
    description: 'Returns the quiz result with product recommendations',
    type: QuizResultDto,
  })
  @ApiResponse({ status: 404, description: 'Quiz not found' })
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
