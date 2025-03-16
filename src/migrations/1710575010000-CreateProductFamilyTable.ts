import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateProductFamilyTable1710575010000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableExists = await queryRunner.hasTable('product_family');
    if (tableExists) {
      await queryRunner.dropTable('product_family');
    }

    await queryRunner.createTable(
      new Table({
        name: 'product_family',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'code',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'categoryId',
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
      'product_family',
      new TableForeignKey({
        columnNames: ['categoryId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product_category',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('product_family');
    if (!table) {
      return;
    }

    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('categoryId') !== -1,
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey('product_family', foreignKey);
    }

    await queryRunner.dropTable('product_family');
  }
}
