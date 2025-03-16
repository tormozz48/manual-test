import { AnswerDto } from './answer.dto';

export class QuestionDto {
  id: number;
  code: string;
  name: string;
  quizId: number;
  answers: AnswerDto[];
}
