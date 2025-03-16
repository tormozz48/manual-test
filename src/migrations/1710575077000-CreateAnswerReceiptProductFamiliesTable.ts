import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateAnswerReceiptProductFamiliesTable1710575077000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'answer_receipt_product_families',
        columns: [
          {
            name: 'answerReceiptId',
            type: 'integer',
            isPrimary: true,
          },
          {
            name: 'productFamilyId',
            type: 'integer',
            isPrimary: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'answer_receipt_product_families',
      new TableForeignKey({
        columnNames: ['answerReceiptId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'answer_receipt',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'answer_receipt_product_families',
      new TableForeignKey({
        columnNames: ['productFamilyId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product_family',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const answerReceiptProductFamiliesTable = await queryRunner.getTable(
      'answer_receipt_product_families',
    );
    if (answerReceiptProductFamiliesTable) {
      const foreignKeys = answerReceiptProductFamiliesTable.foreignKeys;
      for (const foreignKey of foreignKeys) {
        await queryRunner.dropForeignKey(
          'answer_receipt_product_families',
          foreignKey,
        );
      }
      await queryRunner.dropTable('answer_receipt_product_families');
    }
  }
}
