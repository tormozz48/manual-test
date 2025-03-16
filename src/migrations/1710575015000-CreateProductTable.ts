import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateProductTable1710575015000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableExists = await queryRunner.hasTable('product');
    if (tableExists) {
      await queryRunner.dropTable('product');
    }

    await queryRunner.createTable(
      new Table({
        name: 'product',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'doze',
            type: 'integer',
            default: 0,
          },
          {
            name: 'unit',
            type: 'varchar',
          },
          {
            name: 'categoryId',
            type: 'integer',
          },
          {
            name: 'familyId',
            type: 'integer',
          },
          {
            name: 'createdAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'product',
      new TableForeignKey({
        columnNames: ['categoryId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product_category',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'product',
      new TableForeignKey({
        columnNames: ['familyId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product_family',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('product');
    if (!table) {
      return;
    }

    const categoryForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('categoryId') !== -1,
    );
    if (categoryForeignKey) {
      await queryRunner.dropForeignKey('product', categoryForeignKey);
    }

    const familyForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('familyId') !== -1,
    );
    if (familyForeignKey) {
      await queryRunner.dropForeignKey('product', familyForeignKey);
    }

    await queryRunner.dropTable('product');
  }
}
