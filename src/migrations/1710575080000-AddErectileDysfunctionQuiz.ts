import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddErectileDysfunctionQuiz1710575080000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const edCategory = (await queryRunner.query(
      `SELECT id FROM product_category WHERE code = 'ED'`,
    )) as { id: number }[];

    if (!edCategory || edCategory.length === 0) {
      throw new Error(
        'ED category not found. Please run the AddErectileDysfunctionCategory migration first.',
      );
    }

    const categoryId = edCategory[0].id;

    const existingQuiz = (await queryRunner.query(
      `SELECT * FROM quiz WHERE name = 'Erectile Dysfunction Quiz' AND categoryId = ${categoryId}`,
    )) as { id: number }[];

    if (existingQuiz && existingQuiz.length > 0) {
      await queryRunner.query(`
        DELETE FROM quiz
        WHERE name = 'Erectile Dysfunction Quiz' AND categoryId = ${categoryId}
      `);
    }

    await queryRunner.query(`
      INSERT INTO quiz (name, categoryId, createdAt, updatedAt)
      VALUES ('Erectile Dysfunction Quiz', ${categoryId}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const edCategory = (await queryRunner.query(
      `SELECT id FROM product_category WHERE code = 'ED'`,
    )) as { id: number }[];

    if (edCategory && edCategory.length > 0) {
      const categoryId = edCategory[0].id;

      await queryRunner.query(`
        DELETE FROM quiz
        WHERE name = 'Erectile Dysfunction Quiz' AND categoryId = ${categoryId}
      `);
    }
  }
}
