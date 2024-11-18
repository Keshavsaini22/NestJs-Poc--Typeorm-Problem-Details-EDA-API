import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateConversations1731923647933 implements MigrationInterface {
    name = 'CreateConversations1731923647933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'conversations',
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
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('conversations');
      }

}
