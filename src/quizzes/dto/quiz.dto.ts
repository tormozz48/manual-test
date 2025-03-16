import { QuestionDto } from './question.dto';

export class QuizDto {
  id: number;
  name: string;
  categoryId: number;
  questions: QuestionDto[];
}
