import { MigrationInterface, QueryRunner } from 'typeorm';

export class FillData1710575200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add ED product category
    await queryRunner.query(`
      INSERT INTO product_category (code, name, createdAt, updatedAt)
      VALUES ('ED', 'Erectile Dysfunction', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `);

    const categoryResult = (await queryRunner.query(`
      SELECT id FROM product_category WHERE code = 'ED'
    `)) as { id: number }[];

    const categoryId = categoryResult[0].id;

    // Add product families
    await queryRunner.query(`
      INSERT INTO product_family (code, name, categoryId, createdAt, updatedAt)
      VALUES 
        ('sildenafil', 'Sildenafil', ${categoryId}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('tadalafil', 'Tadalafil', ${categoryId}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `);

    // Get product family IDs
    const sildenafilResult = (await queryRunner.query(`
      SELECT id FROM product_family WHERE code = 'sildenafil' AND categoryId = ${categoryId}
    `)) as { id: number }[];

    const tadalafilResult = (await queryRunner.query(`
      SELECT id FROM product_family WHERE code = 'tadalafil' AND categoryId = ${categoryId}
    `)) as { id: number }[];

    // Add products
    const tadalafilFamilyId = tadalafilResult[0].id;
    const sildenafilFamilyId = sildenafilResult[0].id;

    const products = (await queryRunner.query(`
        INSERT INTO product (name, doze, unit, categoryId, familyId, createdAt, updatedAt)
        VALUES
          ('Sildenafil', 50, 'mg', ${categoryId}, ${sildenafilFamilyId}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
          ('Sildenafil', 100, 'mg', ${categoryId}, ${sildenafilFamilyId}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), 
          ('Tadalafil', 10, 'mg', ${categoryId}, ${tadalafilFamilyId}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
          ('Tadalafil', 20, 'mg', ${categoryId}, ${tadalafilFamilyId}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        RETURNING id, name, doze
      `)) as { id: number; name: string; doze: number }[];

    const sildenafil50 = products.find(
      (p) => p.name === 'Sildenafil' && p.doze === 50,
    );
    const sildenafil100 = products.find(
      (p) => p.name === 'Sildenafil' && p.doze === 100,
    );
    const tadalafil10 = products.find(
      (p) => p.name === 'Tadalafil' && p.doze === 10,
    );
    const tadalafil20 = products.find(
      (p) => p.name === 'Tadalafil' && p.doze === 20,
    );

    // Add ED quiz
    await queryRunner.query(`
      INSERT INTO quiz (name, categoryId, createdAt, updatedAt)
      VALUES ('Erectile Dysfunction Quiz', ${categoryId}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `);

    const quizResult = (await queryRunner.query(`
      SELECT id FROM quiz WHERE categoryId = ${categoryId}
    `)) as { id: number }[];
    const quizId = quizResult[0].id;

    // Add quiz questions
    await queryRunner.query(`
      INSERT INTO question (quizId, code, name, createdAt, updatedAt)
      VALUES 
        (${quizId}, '1', 'Have you ever been diagnosed with erectile dysfunction?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (${quizId}, '2', 'Have you ever taken medication for erectile dysfunction before?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (${quizId}, '2a', 'Did Viagra or Sildenafil work for you?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (${quizId}, '2b', 'Did Cialis or Tadalafil work for you?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (${quizId}, '2c', 'Which medication would you prefer to try?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (${quizId}, '3', 'Do you have any heart conditions?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (${quizId}, '4', 'Are you currently taking any nitrates?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (${quizId}, '5', 'Do you have any of the following conditions?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `);

    // Get questions
    const questions = (await queryRunner.query(`
      SELECT id, code FROM question WHERE quizId = ${quizId}
    `)) as { id: number; code: string }[];

    const codeIs = (code: string) => (q: { code: string }) => q.code === code;

    const question1 = questions.find(codeIs('1'));
    const question2 = questions.find(codeIs('2'));
    const question2a = questions.find(codeIs('2a'));
    const question2b = questions.find(codeIs('2b'));
    const question2c = questions.find(codeIs('2c'));
    const question3 = questions.find(codeIs('3'));
    const question4 = questions.find(codeIs('4'));
    const question5 = questions.find(codeIs('5'));

    // Add answers with answer receipts
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
        name: 'Other',
        nextQuestionId: question2c!.id,
        excludeAll: false,
      },
      {
        questionId: question2!.id,
        name: 'None of above',
        nextQuestionId: question3!.id,
        excludeAll: false,
        products: [sildenafil50!.id, tadalafil10!.id],
      },
      {
        questionId: question2a!.id,
        name: 'Yes',
        nextQuestionId: question3!.id,
        excludeAll: false,
        exclude: [tadalafilFamilyId],
        products: [sildenafil50!.id],
      },
      {
        questionId: question2a!.id,
        name: 'No',
        nextQuestionId: question3!.id,
        excludeAll: false,
        exclude: [sildenafilFamilyId],
        products: [tadalafil20!.id],
      },
      {
        questionId: question2b!.id,
        name: 'Yes',
        nextQuestionId: question3!.id,
        excludeAll: false,
        exclude: [sildenafilFamilyId],
        products: [tadalafil10!.id],
      },
      {
        questionId: question2b!.id,
        name: 'No',
        nextQuestionId: question3!.id,
        excludeAll: false,
        exclude: [tadalafilFamilyId],
        products: [sildenafil100!.id],
      },
      {
        questionId: question2c!.id,
        name: 'Viagra or Sildenafil',
        nextQuestionId: question3!.id,
        excludeAll: false,
        exclude: [tadalafilFamilyId],
        products: [sildenafil100!.id],
      },
      {
        questionId: question2c!.id,
        name: 'Cialis or Tadalafil',
        nextQuestionId: question3!.id,
        excludeAll: false,
        exclude: [sildenafilFamilyId],
        products: [tadalafil20!.id],
      },
      {
        questionId: question2c!.id,
        name: 'Other',
        nextQuestionId: question3!.id,
        excludeAll: false,
        products: [sildenafil100!.id, tadalafil20!.id],
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
        name: 'Yes',
        nextQuestionId: question5!.id,
        excludeAll: true,
      },
      {
        questionId: question4!.id,
        name: 'No',
        nextQuestionId: question5!.id,
        excludeAll: true,
      },
      {
        questionId: question4!.id,
        name: 'I do not know',
        nextQuestionId: question5!.id,
        excludeAll: true,
      },
      {
        questionId: question4!.id,
        name: 'I would prefer not to say',
        nextQuestionId: question5!.id,
        excludeAll: true,
      },
      {
        questionId: question4!.id,
        name: 'Other',
        nextQuestionId: question5!.id,
        excludeAll: true,
      },
      {
        questionId: question5!.id,
        name: 'Diabetes',
        nextQuestionId: null,
        excludeAll: true,
      },
      {
        questionId: question5!.id,
        name: 'High blood pressure',
        nextQuestionId: null,
        excludeAll: true,
      },
      {
        questionId: question5!.id,
        name: 'Liver disease',
        nextQuestionId: null,
        excludeAll: true,
      },
      {
        questionId: question5!.id,
        name: 'Kidney disease',
        nextQuestionId: null,
        excludeAll: true,
      },
      {
        questionId: question5!.id,
        name: 'None of the above',
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

      await queryRunner.query(`
        INSERT INTO answer_receipt (answerId, excludeAll, createdAt, updatedAt)
        VALUES (${answerId}, ${answer.excludeAll ? 1 : 0}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `);

      if (answer.exclude && answer.exclude.length > 0) {
        for (const familyId of answer.exclude) {
          await queryRunner.query(`
            INSERT INTO answer_receipt_product_families (answerReceiptId, productFamilyId)
            VALUES (${answerId}, ${familyId})
          `);
        }
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM answer_receipt
    `);

    await queryRunner.query(`
      DELETE FROM answer
    `);

    await queryRunner.query(`
      DELETE FROM question
    `);

    await queryRunner.query(`
      DELETE FROM quiz
    `);

    await queryRunner.query(`
      DELETE FROM product
    `);

    await queryRunner.query(`
      DELETE FROM product_family
    `);

    await queryRunner.query(`
      DELETE FROM product_category WHERE code = 'ED'
    `);
  }
}
