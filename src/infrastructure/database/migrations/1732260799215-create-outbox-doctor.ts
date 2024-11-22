import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOutboxDoctor1732260799215 implements MigrationInterface {
  name = 'CreateOutboxDoctor1732260799215';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."outbox_doctor_message_status_enum" AS ENUM('sent', 'pending')`,
    );

    await queryRunner.createTable(
      new Table({
        name: 'outbox_message_doctor',
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
            type: `"public"."outbox_doctor_message_status_enum"`,
            default: `'pending'`,
            isNullable: false,
          },
          {
            name: 'sent_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('outbox_message_doctor');
    await queryRunner.query(
      `DROP TYPE "public"."outbox_doctor_message_status_enum"`,
    );
  }
}
