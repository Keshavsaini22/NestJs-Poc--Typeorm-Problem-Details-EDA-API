import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInboxTest1732492042548 implements MigrationInterface {
  name = 'CreateInboxTest1732492042548';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                        CREATE TABLE "inbox_message_test" (
                            "id" SERIAL NOT NULL,
                            "message_id" uuid NOT NULL,
                            "handler_name" character varying NOT NULL,
                            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                            CONSTRAINT "PK_3d5f25b0b6e66c8b77e3dfe029l" PRIMARY KEY ("id")
                        )
                    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "inbox_message_test"`);
  }
}
