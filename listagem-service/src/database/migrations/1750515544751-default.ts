import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1750515544751 implements MigrationInterface {
    name = 'Default1750515544751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "veiculos" ("id" integer NOT NULL, "placa" character varying NOT NULL, "marca" character varying NOT NULL, "modelo" character varying NOT NULL, "ano" integer NOT NULL, "cor" character varying NOT NULL, "dataCadastro" TIMESTAMP NOT NULL, "dataAtualizacao" TIMESTAMP NOT NULL, CONSTRAINT "PK_0c3daa1e5d16914bd9e7777cf77" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "veiculos"`);
    }

}
