import { Roles } from 'src/domain/user/enums/roles.enum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1731923627298 implements MigrationInterface {
  name = 'CreateUsers1731923627298';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TYPE "roles_enum" AS ENUM('admin', 'user')
        `);

    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            isNullable: false,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '100',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'address',
            type: 'varchar',
            length: '250',
            isNullable: false,
          },
          {
            name: 'role',
            type: 'roles_enum',
            default: `'${Roles.USER}'`,
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
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );

    // Add a unique partial index on email and deleted_at
    await queryRunner.query(`
        CREATE UNIQUE INDEX "UQ_users_email_not_deleted"
        ON "users" ("email")
        WHERE "deleted_at" IS NULL
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          DROP INDEX "UQ_users_email_not_deleted"
        `);

    await queryRunner.dropTable('users');

    await queryRunner.query(`DROP TYPE "roles_enum"`);
  }
}
