import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePatient1732166760682 implements MigrationInterface {
  name = 'CreatePatient1732166760682';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'patients',
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
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '100',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'address',
            type: 'varchar',
            length: '250',
            isNullable: true,
          },
          {
            name: 'insurance',
            type: 'boolean',
            default: 'false',
            isNullable: false,
          },
          {
            name: 'date_checkout',
            type: 'date',
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
    // await queryRunner.query(`
    //     CREATE UNIQUE INDEX "UQ_patients_email_not_deleted"
    //     ON "patients" ("email")
    //     WHERE "deleted_at" IS NULL
    //   `);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`
    //     DROP INDEX "UQ_patients_email_not_deleted"
    //   `);

    await queryRunner.dropTable('patients');
  }
}
