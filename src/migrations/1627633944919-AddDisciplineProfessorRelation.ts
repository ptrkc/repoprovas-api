import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDisciplineProfessorRelation1627633944919 implements MigrationInterface {
    name = 'AddDisciplineProfessorRelation1627633944919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "disciplines_professors_professors" ("disciplinesId" integer NOT NULL, "professorsId" integer NOT NULL, CONSTRAINT "PK_023e1fa0f1ff6f1d22d3f7314dc" PRIMARY KEY ("disciplinesId", "professorsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0aa508c1fb1a8efaab13ea6259" ON "disciplines_professors_professors" ("disciplinesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e65f5a816c8dbe7b35872e6a73" ON "disciplines_professors_professors" ("professorsId") `);
        await queryRunner.query(`ALTER TABLE "disciplines_professors_professors" ADD CONSTRAINT "FK_0aa508c1fb1a8efaab13ea62598" FOREIGN KEY ("disciplinesId") REFERENCES "disciplines"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "disciplines_professors_professors" ADD CONSTRAINT "FK_e65f5a816c8dbe7b35872e6a73f" FOREIGN KEY ("professorsId") REFERENCES "professors"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "disciplines_professors_professors" DROP CONSTRAINT "FK_e65f5a816c8dbe7b35872e6a73f"`);
        await queryRunner.query(`ALTER TABLE "disciplines_professors_professors" DROP CONSTRAINT "FK_0aa508c1fb1a8efaab13ea62598"`);
        await queryRunner.query(`DROP INDEX "IDX_e65f5a816c8dbe7b35872e6a73"`);
        await queryRunner.query(`DROP INDEX "IDX_0aa508c1fb1a8efaab13ea6259"`);
        await queryRunner.query(`DROP TABLE "disciplines_professors_professors"`);
    }

}
