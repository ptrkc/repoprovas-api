import {MigrationInterface, QueryRunner} from "typeorm";

export class AddExamAndExamType1627759857588 implements MigrationInterface {
    name = 'AddExamAndExamType1627759857588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "examType" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_fb2f0d1e6c32d055702393a3346" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exams" ("id" SERIAL NOT NULL, "year" integer NOT NULL, "semester" integer NOT NULL, "url" character varying NOT NULL, "typeId" integer, "professorId" integer, "disciplineId" integer, CONSTRAINT "PK_b43159ee3efa440952794b4f53e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."disciplines" DROP CONSTRAINT "disciplines_name_key"`);
        await queryRunner.query(`ALTER TABLE "exams" ADD CONSTRAINT "FK_edb45c09172861a1294f75e80eb" FOREIGN KEY ("typeId") REFERENCES "examType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exams" ADD CONSTRAINT "FK_bcfdfcbfb5fe82b98eb79ac5818" FOREIGN KEY ("professorId") REFERENCES "professors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exams" ADD CONSTRAINT "FK_448fb069febfdb9e6a519121aab" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exams" DROP CONSTRAINT "FK_448fb069febfdb9e6a519121aab"`);
        await queryRunner.query(`ALTER TABLE "exams" DROP CONSTRAINT "FK_bcfdfcbfb5fe82b98eb79ac5818"`);
        await queryRunner.query(`ALTER TABLE "exams" DROP CONSTRAINT "FK_edb45c09172861a1294f75e80eb"`);
        await queryRunner.query(`ALTER TABLE "public"."disciplines" ADD CONSTRAINT "disciplines_name_key" UNIQUE ("name")`);
        await queryRunner.query(`DROP TABLE "exams"`);
        await queryRunner.query(`DROP TABLE "examType"`);
    }

}
