import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1682497387545 implements MigrationInterface {
  name = 'NewMigration1682497387545';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category" ("created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "created_by" character varying, "updated_by" character varying, "is_active" boolean NOT NULL DEFAULT true, "id" BIGSERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(255) NOT NULL, "userId" bigint, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "created_by" character varying, "updated_by" character varying, "is_active" boolean NOT NULL DEFAULT true, "id" BIGSERIAL NOT NULL, "fullName" character varying(100) NOT NULL, "address" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "phone" character varying(10) NOT NULL, "gender" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "isEmailVerified" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "created_by" character varying, "updated_by" character varying, "is_active" boolean NOT NULL DEFAULT true, "id" BIGSERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(255) NOT NULL, "price" bigint NOT NULL, "delivery" boolean NOT NULL, "deliveryCharge" bigint, "available" boolean DEFAULT true, "deliveryLocation" character varying(100), "files" text NOT NULL, "userId" bigint, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD CONSTRAINT "FK_32b856438dffdc269fa84434d9f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_329b8ae12068b23da547d3b4798" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_329b8ae12068b23da547d3b4798"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" DROP CONSTRAINT "FK_32b856438dffdc269fa84434d9f"`,
    );
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "category"`);
  }
}
