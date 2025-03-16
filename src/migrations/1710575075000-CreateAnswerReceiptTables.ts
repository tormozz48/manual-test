import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateAnswerReceiptTables1710575075000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'answer_receipt',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'excludeAll',
            type: 'boolean',
            default: false,
          },
          {
            name: 'answerId',
            type: 'integer',
            isUnique: true,
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
      'answer_receipt',
      new TableForeignKey({
        columnNames: ['answerId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'answer',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const answerReceiptTable = await queryRunner.getTable('answer_receipt');
    if (answerReceiptTable) {
      const foreignKeys = answerReceiptTable.foreignKeys;
      for (const foreignKey of foreignKeys) {
        await queryRunner.dropForeignKey('answer_receipt', foreignKey);
      }
      await queryRunner.dropTable('answer_receipt');
    }
  }
}
