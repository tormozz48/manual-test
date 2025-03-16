import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddErectileDysfunctionQuizAnswers1710575110000
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

    const questions = (await queryRunner.query(
      `SELECT id, code FROM question WHERE quizId = ${quizId}`,
    )) as { id: number; code: string }[];

    if (!questions || questions.length === 0) {
      throw new Error(
        'No questions found for the Erectile Dysfunction Quiz. Please run the AddErectileDysfunctionQuizQuestions migration first.',
      );
    }

    const codeIs = (code: string) => (q: { code: string }) => q.code === code;
    const question1 = questions.find(codeIs('1'));
    const question2 = questions.find(codeIs('2'));
    const question2a = questions.find(codeIs('2a'));
    const question2b = questions.find(codeIs('2b'));
    const question2c = questions.find(codeIs('2c'));
    const question3 = questions.find(codeIs('3'));
    const question4 = questions.find(codeIs('4'));
    const question5 = questions.find(codeIs('5'));

    const answersData = [
      {
        questionId: question1!.id,
        name: 'Yes',
        nextQuestionId: question2!.id,
        excludeAll: false,
      },
      {
        questionId: question1!.id,
        name: 'No',
        nextQuestionId: question2!.id,
        excludeAll: true,
      },
      {
        questionId: question2!.id,
        name: 'Viagra or Sildenafil',
        nextQuestionId: question2a!.id,
        excludeAll: false,
      },
      {
        questionId: question2!.id,
        name: 'Cialis or Tadalafil',
        nextQuestionId: question2b!.id,
        excludeAll: false,
      },
      {
        questionId: question2!.id,
        name: 'Both',
        nextQuestionId: question2c!.id,
        excludeAll: false,
      },
      {
        questionId: question2!.id,
        name: 'None of above',
        nextQuestionId: question3!.id,
        excludeAll: false,
        products: [],
      },
      {
        questionId: question2a!.id,
        name: 'Yes',
        nextQuestionId: question3!.id,
        excludeAll: false,
      },
      {
        questionId: question2a!.id,
        name: 'No',
        nextQuestionId: question3!.id,
        excludeAll: false,
      },
      {
        questionId: question2b!.id,
        name: 'Yes',
        nextQuestionId: question3!.id,
        excludeAll: false,
      },
      {
        questionId: question2b!.id,
        name: 'No',
        nextQuestionId: question3!.id,
        excludeAll: false,
      },
      {
        questionId: question2c!.id,
        name: 'Viagra or Sildenafil',
        nextQuestionId: question3!.id,
        excludeAll: false,
      },
      {
        questionId: question2c!.id,
        name: 'Cialis or Tadalafil',
        nextQuestionId: question3!.id,
        excludeAll: false,
      },
      {
        questionId: question2c!.id,
        name: 'None of the above',
        nextQuestionId: question3!.id,
        excludeAll: false,
      },
      {
        questionId: question3!.id,
        name: 'Yes',
        nextQuestionId: question4!.id,
        excludeAll: false,
      },
      {
        questionId: question3!.id,
        name: 'No',
        nextQuestionId: question4!.id,
        excludeAll: true,
      },
      {
        questionId: question4!.id,
        name: 'Significant liver problems (such as cirrhosis of the liver) or kidney problems',
        nextQuestionId: question5!.id,
        excludeAll: true,
      },
      {
        questionId: question4!.id,
        name: 'Currently prescribed GTN, Isosorbide mononitrate, Isosorbide dinitrate , Nicorandil (nitrates) or Rectogesic ointment',
        nextQuestionId: question5!.id,
        excludeAll: true,
      },
      {
        questionId: question4!.id,
        name: 'Abnormal blood pressure (lower than 90/50 mmHg or higher than 160/90 mmHg)',
        nextQuestionId: question5!.id,
        excludeAll: true,
      },
      {
        questionId: question4!.id,
        name: 'Condition affecting your penis (such as Peyronies Disease, previous injuries or an inability to retract your foreskin)',
        nextQuestionId: question5!.id,
        excludeAll: true,
      },
      {
        questionId: question4!.id,
        name: 'I do not have any of these conditions',
        nextQuestionId: question5!.id,
        excludeAll: true,
      },
      {
        questionId: question5!.id,
        name: 'Alpha-blocker medication such as Alfuzosin, Doxazosin, Tamsulosin, Prazosin, Terazosin or over-the-counter Flomax',
        nextQuestionId: null,
        excludeAll: true,
      },
      {
        questionId: question5!.id,
        name: 'Riociguat or other guanylate cyclase stimulators (for lung problems)',
        nextQuestionId: null,
        excludeAll: true,
      },
      {
        questionId: question5!.id,
        name: 'Saquinavir, Ritonavir or Indinavir (for HIV)',
        nextQuestionId: null,
        excludeAll: true,
      },
      {
        questionId: question5!.id,
        name: 'Cimetidine (for heartburn)',
        nextQuestionId: null,
        excludeAll: true,
      },
      {
        questionId: question5!.id,
        name: 'I do not take any of these drugs',
        nextQuestionId: null,
        excludeAll: true,
      },
    ];

    for (const answer of answersData) {
      const [{ id: answerId }] = (await queryRunner.query(`
        INSERT INTO answer (questionId, name, nextQuestionId, createdAt, updatedAt)
        VALUES (${answer.questionId}, '${answer.name}', ${answer.nextQuestionId || 'NULL'}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        RETURNING id
      `)) as { id: number }[];

      const [{ id: answerReceiptId }] = (await queryRunner.query(`
        INSERT INTO answer_receipt (answerId, excludeAll, createdAt, updatedAt)
        VALUES (${answerId}, ${answer.excludeAll}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        RETURNING id
      `)) as { id: number }[];
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const edQuiz = (await queryRunner.query(
      `SELECT id FROM quiz WHERE name = 'Erectile Dysfunction Quiz'`,
    )) as { id: number }[];

    if (edQuiz && edQuiz.length > 0) {
      const quizId = edQuiz[0].id;

      const questions = (await queryRunner.query(
        `SELECT id FROM question WHERE quizId = ${quizId}`,
      )) as { id: number }[];

      for (const question of questions) {
        await queryRunner.query(`
          DELETE FROM answer
          WHERE questionId = ${question.id}
        `);

        await queryRunner.query(`
          DELETE FROM answer_receipt
          WHERE answerId IN (SELECT id FROM answer WHERE questionId = ${question.id})
        `);
      }
    }
  }
}
