import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateQuestionTable1710575060000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableExists = await queryRunner.hasTable('question');
    if (tableExists) {
      await queryRunner.dropTable('question');
    }

    await queryRunner.createTable(
      new Table({
        name: 'question',
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
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'quizId',
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
      'question',
      new TableForeignKey({
        columnNames: ['quizId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'quiz',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('question');
    if (table) {
      const foreignKey = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('quizId') !== -1,
      );
      if (foreignKey) {
        await queryRunner.dropForeignKey('question', foreignKey);
      }
    }
    await queryRunner.dropTable('question');
  }
}
