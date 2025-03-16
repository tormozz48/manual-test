import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Server } from 'http';
import { QuizDto } from '../src/quizzes/dto';
import { QuizResultDto } from '../src/quizzes/dto/quizResult.dto';

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

  describe('/quizzes/:id/submit (POST)', () => {
    let quizId: number;
    const answerIds: { [key: string]: number } = {};

    // Get the quiz data before running the tests
    beforeAll(async () => {
      const httpServer = app.getHttpServer() as Server;
      const response = await request(httpServer).get('/quizzes/category/ED');
      const quiz = response.body as QuizDto;
      quizId = quiz.id;

      // Store answer IDs by question code and answer name for easier reference
      for (const question of quiz.questions) {
        for (const answer of question.answers) {
          const key = `${question.code}:${answer.name}`;
          answerIds[key] = answer.id;
        }
      }
    });

    it('should return 404 for non-existent quiz', async () => {
      const httpServer = app.getHttpServer() as Server;
      return request(httpServer)
        .post('/quizzes/999/submit')
        .send({
          answers: [{ id: 1 }],
        })
        .expect(404);
    });

    it('should return a result with the correct structure when submitting answers', async () => {
      const httpServer = app.getHttpServer() as Server;

      // Path that should recommend products
      const answers = [
        { id: answerIds['1:Yes'] },
        { id: answerIds['2:None of above'] }, // This answer has products: [sildenafil50, tadalafil10]
        { id: answerIds['3:No'] },
        { id: answerIds['4:I do not have any of these conditions'] },
        { id: answerIds['5:I do not take any of these drugs'] },
      ];

      const response = await request(httpServer)
        .post(`/quizzes/${quizId}/submit`)
        .send({
          answers,
        })
        .expect(200);

      const result = response.body as QuizResultDto;

      // Verify result structure
      expect(result).toBeDefined();
      expect(result.id).toBe(quizId);

      // Verify products array structure
      expect(Array.isArray(result.products)).toBe(true);

      // Verify product structure if any products are returned
      if (result.products.length > 0) {
        for (const product of result.products) {
          expect(product.id).toBeDefined();
          expect(product.name).toBeDefined();
          expect(product.doze).toBeDefined();
          expect(product.unit).toBeDefined();
          expect(product.title).toBeDefined();
          expect(product.title).toBe(`${product.name} ${product.doze}${product.unit}`);
          expect(product.categoryId).toBeDefined();
          expect(product.familyId).toBeDefined();
        }
      }

      // Verify excludes structure
      expect(Array.isArray(result.excludes)).toBe(true);
    });

    it('should return a result with the correct structure when submitting answers that exclude all products', async () => {
      const httpServer = app.getHttpServer() as Server;

      // Path: No -> (any answer) -> (any answer) -> (any answer) -> (any answer)
      // The "No" answer to the first question has excludeAll=true
      const answers = [
        { id: answerIds['1:No'] }, // This answer has excludeAll: true
        { id: answerIds['2:None of above'] },
        { id: answerIds['3:No'] },
        { id: answerIds['4:I do not have any of these conditions'] },
        { id: answerIds['5:I do not take any of these drugs'] },
      ];

      const response = await request(httpServer)
        .post(`/quizzes/${quizId}/submit`)
        .send({
          answers,
        })
        .expect(200);

      const result = response.body as QuizResultDto;

      // Verify result structure
      expect(result).toBeDefined();
      expect(result.id).toBe(quizId);

      // This path should exclude all products
      expect(Array.isArray(result.products)).toBe(true);
      expect(result.products.length).toBe(0);

      // Verify excludes structure
      expect(Array.isArray(result.excludes)).toBe(true);
      expect(result.excludes.length).toBeGreaterThan(0);

      // Verify exclude structure
      for (const exclude of result.excludes) {
        expect(exclude.id).toBeDefined();
        expect(exclude.name).toBeDefined();
        expect(exclude.code).toBeDefined();
        expect(exclude.categoryId).toBeDefined();
      }
    });

    it('should return a result with the correct structure when submitting answers for Sildenafil path', async () => {
      const httpServer = app.getHttpServer() as Server;

      // Path that should recommend Sildenafil products
      const answers = [
        { id: answerIds['1:Yes'] },
        { id: answerIds['2:Viagra or Sildenafil'] },
        { id: answerIds['2a:Yes'] }, // This answer has products: [sildenafil50] and exclude: [tadalafilFamilyId]
        { id: answerIds['3:No'] },
        { id: answerIds['4:I do not have any of these conditions'] },
        { id: answerIds['5:I do not take any of these drugs'] },
      ];

      const response = await request(httpServer)
        .post(`/quizzes/${quizId}/submit`)
        .send({
          answers,
        })
        .expect(200);

      const result = response.body as QuizResultDto;

      // Verify result structure
      expect(result).toBeDefined();
      expect(result.id).toBe(quizId);

      // Verify products array structure
      expect(Array.isArray(result.products)).toBe(true);

      // If products are returned, verify they are Sildenafil
      if (result.products.length > 0) {
        for (const product of result.products) {
          expect(product.name).toBe('Sildenafil');
        }
      }

      // Verify excludes structure
      expect(Array.isArray(result.excludes)).toBe(true);
    });

    it('should return a result with the correct structure when submitting answers for Tadalafil path', async () => {
      const httpServer = app.getHttpServer() as Server;

      // Path that should recommend Tadalafil products
      const answers = [
        { id: answerIds['1:Yes'] },
        { id: answerIds['2:Cialis or Tadalafil'] },
        { id: answerIds['2b:Yes'] }, // This answer has products: [tadalafil10] and exclude: [sildenafilFamilyId]
        { id: answerIds['3:No'] },
        { id: answerIds['4:I do not have any of these conditions'] },
        { id: answerIds['5:I do not take any of these drugs'] },
      ];

      const response = await request(httpServer)
        .post(`/quizzes/${quizId}/submit`)
        .send({
          answers,
        })
        .expect(200);

      const result = response.body as QuizResultDto;

      // Verify result structure
      expect(result).toBeDefined();
      expect(result.id).toBe(quizId);

      // Verify products array structure
      expect(Array.isArray(result.products)).toBe(true);

      // If products are returned, verify they are Tadalafil
      if (result.products.length > 0) {
        for (const product of result.products) {
          expect(product.name).toBe('Tadalafil');
        }
      }

      // Verify excludes structure
      expect(Array.isArray(result.excludes)).toBe(true);
    });
  });
});
