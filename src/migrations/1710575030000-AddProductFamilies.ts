import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductFamilies1710575030000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const categoryResult = (await queryRunner.query(`
      SELECT id FROM product_category WHERE code = 'ED'
    `)) as { id: number }[];

    if (!categoryResult || categoryResult.length === 0) {
      console.warn(
        'ED product category not found. Product families were not added.',
      );
      return;
    }

    const categoryId = categoryResult[0].id;

    await queryRunner.query(
      `DELETE FROM product_family WHERE categoryId = ${categoryId}`,
    );

    await queryRunner.query(`
      INSERT INTO product_family (code, name, categoryId, createdAt, updatedAt)
      VALUES ('sildenafil', 'Sildenafil', ${categoryId}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `);

    await queryRunner.query(`
      INSERT INTO product_family (code, name, categoryId, createdAt, updatedAt)
      VALUES ('tadalafil', 'Tadalafil', ${categoryId}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM product_family WHERE code IN ('sildenafil', 'tadalafil')`,
    );
  }
}
