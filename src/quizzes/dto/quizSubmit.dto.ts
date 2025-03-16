import { ApiProperty } from '@nestjs/swagger';
import { AnswerDto } from './answer.dto';
import { QuizDto } from './quiz.dto';

export class QuizSubmitDto {
  @ApiProperty({
    description: 'ID of the quiz being submitted',
    example: { id: 1 },
  })
  id: Pick<QuizDto, 'id'>;

  @ApiProperty({
    description: 'List of selected answer IDs',
    example: [{ id: 1 }, { id: 3 }],
    type: [Object],
  })
  answers: Pick<AnswerDto, 'id'>[];
}
