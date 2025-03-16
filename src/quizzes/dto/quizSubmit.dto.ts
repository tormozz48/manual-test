import { AnswerDto } from './answer.dto';
import { QuizDto } from './quiz.dto';

export class QuizSubmitDto {
  id: Pick<QuizDto, 'id'>;
  answers: Pick<AnswerDto, 'id'>[];
}
