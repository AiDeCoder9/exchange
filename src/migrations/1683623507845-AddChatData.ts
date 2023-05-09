import { MigrationInterface, QueryRunner } from "typeorm";

export class AddChatData1683623507845 implements MigrationInterface {
    name = 'AddChatData1683623507845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chat" ("created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "created_by" character varying, "updated_by" character varying, "is_active" boolean NOT NULL DEFAULT true, "id" BIGSERIAL NOT NULL, "message" character varying(255) NOT NULL, "senderId" integer NOT NULL, "receiverId" integer NOT NULL, "productId" bigint, CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_6364eadbf8bfbb9a32ad1331ea6" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_6364eadbf8bfbb9a32ad1331ea6"`);
        await queryRunner.query(`DROP TABLE "chat"`);
    }

}
