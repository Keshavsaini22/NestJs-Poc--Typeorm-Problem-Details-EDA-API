import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateParticipants1731923659645 implements MigrationInterface {
  name = 'CreateParticipants1731923659645';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'participants',
        columns: [
          {
            name: 'uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            isNullable: false,
          },
          {
            name: 'user',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'conversation',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
        ],
      }),
    );

    // Create foreign key constraints
    await queryRunner.createForeignKey(
      'participants',
      new TableForeignKey({
        columnNames: ['user'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        // onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'participants',
      new TableForeignKey({
        columnNames: ['conversation'],
        referencedColumnNames: ['uuid'],
        referencedTableName: 'conversations',
        // onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const participantsTable = await queryRunner.getTable('participants');
    const userForeignKey = participantsTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user') !== -1,
    );
    const conversationForeignKey = participantsTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('conversation') !== -1,
    );

    await queryRunner.dropForeignKey('participants', userForeignKey);
    await queryRunner.dropForeignKey('participants', conversationForeignKey);
    await queryRunner.dropTable('participants');
  }
}
