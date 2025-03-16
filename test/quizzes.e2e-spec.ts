import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Server } from 'http';
import { QuizDto } from 'src/quizzes/dto';

describe('QuizzesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/quizzes/category/:code (GET)', () => {
    it('should return a quiz for ED category', async () => {
      const httpServer = app.getHttpServer() as Server;
      const response = await request(httpServer)
        .get('/quizzes/category/ED')
        .expect(200);

      const quiz = response.body as QuizDto;

      // Verify quiz structure
      expect(quiz).toBeDefined();
      expect(quiz.id).toBeDefined();
      expect(quiz.name).toBe('Erectile Dysfunction Quiz');
      expect(quiz.categoryId).toBeDefined();

      // Verify questions array
      expect(Array.isArray(quiz.questions)).toBe(true);
      expect(quiz.questions.length).toBe(8);

      // Verify questions are sorted by code
      const questionCodes = quiz.questions.map((q) => q.code);
      expect(questionCodes).toEqual([
        '1',
        '2',
        '2a',
        '2b',
        '2c',
        '3',
        '4',
        '5',
      ]);

      // Verify first question structure
      const firstQuestion = quiz.questions.find((q) => q.code === '1');
      expect(firstQuestion).toBeDefined();
      if (!firstQuestion) return; // Add null check to satisfy TypeScript

      expect(firstQuestion.name).toBe(
        'Do you have difficulty getting or maintaining an erection?',
      );
      expect(firstQuestion.quizId).toBe(quiz.id);

      // Verify answers for first question
      expect(Array.isArray(firstQuestion.answers)).toBe(true);
      expect(firstQuestion.answers.length).toBe(2);

      // Verify answer structure
      const firstAnswer = firstQuestion.answers[0];
      expect(firstAnswer).toBeDefined();
      expect(firstAnswer.id).toBeDefined();
      expect(firstAnswer.name).toBe('Yes');
      expect(firstAnswer.questionId).toBe(firstQuestion.id);
      expect(firstAnswer.nextQuestionId).toBeDefined();

      // Verify question flow
      const secondQuestionId = firstAnswer.nextQuestionId;
      const secondQuestion = quiz.questions.find(
        (q) => q.id === secondQuestionId,
      );
      expect(secondQuestion).toBeDefined();
      if (!secondQuestion) return; // Add null check to satisfy TypeScript

      expect(secondQuestion.code).toBe('2');
    });

    it('should return 404 for non-existent category', () => {
      const httpServer = app.getHttpServer() as Server;
      return request(httpServer)
        .get('/quizzes/category/NONEXISTENT')
        .expect(404);
    });

    it('should have proper structure for all questions', async () => {
      const httpServer = app.getHttpServer() as Server;
      const response = await request(httpServer)
        .get('/quizzes/category/ED')
        .expect(200);

      const quiz = response.body as QuizDto;

      // Check all questions have required fields
      for (const question of quiz.questions) {
        expect(question.id).toBeDefined();
        expect(question.code).toBeDefined();
        expect(question.name).toBeDefined();
        expect(question.quizId).toBe(quiz.id);
        expect(Array.isArray(question.answers)).toBe(true);

        // Check all answers have required fields
        for (const answer of question.answers) {
          expect(answer.id).toBeDefined();
          expect(answer.name).toBeDefined();
          expect(answer.questionId).toBe(question.id);

          // If not the last question, nextQuestionId should be defined
          if (question.code !== '5') {
            expect(answer.nextQuestionId).toBeDefined();

            // Verify the next question exists
            const nextQuestion = quiz.questions.find(
              (q) => q.id === answer.nextQuestionId,
            );
            expect(nextQuestion).toBeDefined();
          }
        }
      }
    });
  });
});
