import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOutboxMessage1732166840790 implements MigrationInterface {
  name = 'CreateOutboxMessage1732166840790';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."outbox_message_status_enum" AS ENUM('sent', 'pending')`,
    );

    await queryRunner.createTable(
      new Table({
        name: 'outbox_message_patient',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'message_id',
            type: 'uuid',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'type',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'headers',
            type: 'jsonb',
            isNullable: false,
          },
          {
            name: 'properties',
            type: 'jsonb',
            isNullable: false,
          },
          {
            name: 'body',
            type: 'jsonb',
            isNullable: false,
          },
          {
            name: 'status',
            type: `"public"."outbox_message_status_enum"`,
            default: `'pending'`,
            isNullable: false,
          },
          {
            name: 'sent_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('outbox_message_patient');
    await queryRunner.query(`DROP TYPE "public"."outbox_message_status_enum"`);
  }
}
