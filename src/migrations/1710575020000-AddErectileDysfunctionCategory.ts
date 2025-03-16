import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddErectileDysfunctionCategory1710575020000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const existingCategory = (await queryRunner.query(
      `SELECT * FROM product_category WHERE code = 'ED'`,
    )) as any[];

    if (existingCategory && existingCategory.length > 0) {
      await queryRunner.query(`
        DELETE FROM product_category
        WHERE code = 'ED'
      `);
    }

    await queryRunner.query(`
      INSERT INTO product_category (code, name, createdAt, updatedAt)
      VALUES ('ED', 'Erectile Dysfunction', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM product_category
      WHERE code = 'ED'
    `);
  }
}
