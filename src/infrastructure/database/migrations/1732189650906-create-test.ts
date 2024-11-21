import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTest1732189650906 implements MigrationInterface {
  name = 'CreateTest1732189650906';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tests',
        columns: [
          {
            name: 'uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'result',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'patient_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'doctor_id',
            type: 'uuid',
            isNullable: false,
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
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'tests',
      new TableForeignKey({
        columnNames: ['patient_id'],
        referencedColumnNames: ['uuid'],
        referencedTableName: 'patients',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'tests',
      new TableForeignKey({
        columnNames: ['doctor_id'],
        referencedColumnNames: ['uuid'],
        referencedTableName: 'doctors',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('tests');
    const patientForeignKey = table.foreignKeys.find((fk) =>
      fk.columnNames.includes('patient_id'),
    );
    const doctorForeignKey = table.foreignKeys.find((fk) =>
      fk.columnNames.includes('doctor_id'),
    );

    if (patientForeignKey) {
      await queryRunner.dropForeignKey('tests', patientForeignKey);
    }
    if (doctorForeignKey) {
      await queryRunner.dropForeignKey('tests', doctorForeignKey);
    }

    await queryRunner.dropTable('tests');
  }
}
