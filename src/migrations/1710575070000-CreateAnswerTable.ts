import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateAnswerTable1710575070000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableExists = await queryRunner.hasTable('answer');
    if (tableExists) {
      await queryRunner.dropTable('answer');
    }

    await queryRunner.createTable(
      new Table({
        name: 'answer',
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
            name: 'questionId',
            type: 'integer',
          },
          {
            name: 'nextQuestionId',
            type: 'integer',
            isNullable: true,
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
      'answer',
      new TableForeignKey({
        columnNames: ['questionId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'question',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'answer',
      new TableForeignKey({
        columnNames: ['nextQuestionId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'question',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('answer');
    if (table) {
      const questionForeignKey = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('questionId') !== -1,
      );
      if (questionForeignKey) {
        await queryRunner.dropForeignKey('answer', questionForeignKey);
      }

      const nextQuestionForeignKey = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('nextQuestionId') !== -1,
      );
      if (nextQuestionForeignKey) {
        await queryRunner.dropForeignKey('answer', nextQuestionForeignKey);
      }
    }
    await queryRunner.dropTable('answer');
  }
}
