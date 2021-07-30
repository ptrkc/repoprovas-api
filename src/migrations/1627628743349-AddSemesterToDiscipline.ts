import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSemesterToDiscipline1627628743349 implements MigrationInterface {
    name = 'AddSemesterToDiscipline1627628743349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."disciplines" ADD "semester" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."disciplines" DROP COLUMN "semester"`);
    }

}
