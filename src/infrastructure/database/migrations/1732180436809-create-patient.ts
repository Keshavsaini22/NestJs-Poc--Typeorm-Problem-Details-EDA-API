import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreatePatient1732180436809 implements MigrationInterface {
  name = 'CreatePatient1732180436809';

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
            default: false,
          },
          {
            name: 'date_checkout',
            type: 'date',
          },
          {
            name: 'doctor_uuid',
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
      'patients',
      new TableForeignKey({
        columnNames: ['doctor_uuid'],
        referencedColumnNames: ['uuid'],
        referencedTableName: 'doctors',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('patients');
    const foreignKey = table.foreignKeys.find((fk) =>
      fk.columnNames.includes('doctor_uuid'),
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey('patients', foreignKey);
    }

    await queryRunner.dropTable('patients');
  }
}
