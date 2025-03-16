import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSampleProducts1710575040000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const categoryResult = (await queryRunner.query(`
      SELECT id FROM product_category WHERE code = 'ED'
    `)) as { id: number }[];

    if (!categoryResult || categoryResult.length === 0) {
      console.warn('ED product category not found. Products were not added.');
      return;
    }

    const categoryId = categoryResult[0].id;

    const sildenafilResult = (await queryRunner.query(`
      SELECT id FROM product_family WHERE code = 'sildenafil' AND categoryId = ${categoryId}
    `)) as { id: number }[];

    const tadalafilResult = (await queryRunner.query(`
      SELECT id FROM product_family WHERE code = 'tadalafil' AND categoryId = ${categoryId}
    `)) as { id: number }[];

    await queryRunner.query(`
      DELETE FROM product WHERE categoryId = ${categoryId}
    `);

    if (!sildenafilResult || sildenafilResult.length === 0) {
      console.warn(
        'Sildenafil product family not found. Sildenafil products were not added.',
      );
    } else {
      const sildenafilFamilyId = sildenafilResult[0].id;

      await queryRunner.query(`
        INSERT INTO product (name, doze, unit, categoryId, familyId, createdAt, updatedAt)
        VALUES ('Sildenafil', 50, 'mg', ${categoryId}, ${sildenafilFamilyId}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `);

      await queryRunner.query(`
        INSERT INTO product (name, doze, unit, categoryId, familyId, createdAt, updatedAt)
        VALUES ('Sildenafil', 100, 'mg', ${categoryId}, ${sildenafilFamilyId}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `);
    }

    if (!tadalafilResult || tadalafilResult.length === 0) {
      console.warn(
        'Tadalafil product family not found. Tadalafil products were not added.',
      );
    } else {
      const tadalafilFamilyId = tadalafilResult[0].id;

      await queryRunner.query(`
        INSERT INTO product (name, doze, unit, categoryId, familyId, createdAt, updatedAt)
        VALUES ('Tadalafil', 10, 'mg', ${categoryId}, ${tadalafilFamilyId}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `);

      await queryRunner.query(`
        INSERT INTO product (name, doze, unit, categoryId, familyId, createdAt, updatedAt)
        VALUES ('Tadalafil', 20, 'mg', ${categoryId}, ${tadalafilFamilyId}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const categoryResult = (await queryRunner.query(`
      SELECT id FROM product_category WHERE code = 'ED'
    `)) as { id: number }[];

    if (!categoryResult || categoryResult.length === 0) {
      return;
    }

    const categoryId = categoryResult[0].id;

    await queryRunner.query(`
      DELETE FROM product WHERE categoryId = ${categoryId}
    `);
  }
}
