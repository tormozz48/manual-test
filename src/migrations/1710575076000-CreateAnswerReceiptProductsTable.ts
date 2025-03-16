import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateAnswerReceiptProductsTable1710575076000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'answer_receipt_products',
        columns: [
          {
            name: 'answerReceiptId',
            type: 'integer',
            isPrimary: true,
          },
          {
            name: 'productId',
            type: 'integer',
            isPrimary: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'answer_receipt_products',
      new TableForeignKey({
        columnNames: ['answerReceiptId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'answer_receipt',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'answer_receipt_products',
      new TableForeignKey({
        columnNames: ['productId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const answerReceiptProductsTable = await queryRunner.getTable(
      'answer_receipt_products',
    );
    if (answerReceiptProductsTable) {
      const foreignKeys = answerReceiptProductsTable.foreignKeys;
      for (const foreignKey of foreignKeys) {
        await queryRunner.dropForeignKey('answer_receipt_products', foreignKey);
      }
      await queryRunner.dropTable('answer_receipt_products');
    }
  }
}
