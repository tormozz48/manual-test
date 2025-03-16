import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddErectileDysfunctionQuizQuestions1710575100000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const edQuiz = (await queryRunner.query(
      `SELECT id FROM quiz WHERE name = 'Erectile Dysfunction Quiz'`,
    )) as { id: number }[];

    if (!edQuiz || edQuiz.length === 0) {
      throw new Error(
        'Erectile Dysfunction Quiz not found. Please run the AddErectileDysfunctionQuiz migration first.',
      );
    }

    const quizId = edQuiz[0].id;

    const questionsData = [
      {
        code: '1',
        name: 'Do you have difficulty getting or maintaining an erection?',
      },
      {
        code: '2',
        name: 'Have you tried any of the following treatments before?',
      },
      {
        code: '2a',
        name: 'Was the Viagra or Sildenafil product you tried before effective?',
      },
      {
        code: '2b',
        name: 'Was the Cialis or Tadalafil product you tried before effective?',
      },
      { code: '2c', name: 'Which is your preferred treatment?' },
      {
        code: '3',
        name: 'Do you have, or have you ever had, any heart or neurological conditions?',
      },
      {
        code: '4',
        name: 'Do any of the listed medical conditions apply to you?',
      },
      { code: '5', name: 'Are you taking any of the following drugs?' },
    ];

    for (const question of questionsData) {
      await queryRunner.query(`
        INSERT INTO question (code, name, quizId, createdAt, updatedAt)
        VALUES ('${question.code}', '${question.name}', ${quizId}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const edQuiz = (await queryRunner.query(
      `SELECT id FROM quiz WHERE name = 'Erectile Dysfunction Quiz'`,
    )) as { id: number }[];

    if (edQuiz && edQuiz.length > 0) {
      const quizId = edQuiz[0].id;
      await queryRunner.query(`
        DELETE FROM question
        WHERE quizId = ${quizId}
      `);
    }
  }
}
