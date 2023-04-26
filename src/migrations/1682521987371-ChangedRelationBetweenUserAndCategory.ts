import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedRelationBetweenUserAndCategory1682521987371 implements MigrationInterface {
    name = 'ChangedRelationBetweenUserAndCategory1682521987371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_categories_category" ("userId" bigint NOT NULL, "categoryId" bigint NOT NULL, CONSTRAINT "PK_5a62c2d9eba0ec02cda365b9ab7" PRIMARY KEY ("userId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_331665e2e7d360bf2b715dfeea" ON "user_categories_category" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_936afd72159ca6d1143ab3d66a" ON "user_categories_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "user_categories_category" ADD CONSTRAINT "FK_331665e2e7d360bf2b715dfeea9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_categories_category" ADD CONSTRAINT "FK_936afd72159ca6d1143ab3d66af" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_categories_category" DROP CONSTRAINT "FK_936afd72159ca6d1143ab3d66af"`);
        await queryRunner.query(`ALTER TABLE "user_categories_category" DROP CONSTRAINT "FK_331665e2e7d360bf2b715dfeea9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_936afd72159ca6d1143ab3d66a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_331665e2e7d360bf2b715dfeea"`);
        await queryRunner.query(`DROP TABLE "user_categories_category"`);
    }

}
