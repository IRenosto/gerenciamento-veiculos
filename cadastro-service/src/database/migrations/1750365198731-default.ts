import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1750365198731 implements MigrationInterface {
    name = 'Default1750365198731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "veiculos" ("id" BIGSERIAL NOT NULL, "placa" character varying(10) NOT NULL, "marca" character varying(50) NOT NULL, "modelo" character varying(50) NOT NULL, "ano" integer NOT NULL, "cor" character varying(30) NOT NULL, "dataCadastro" TIMESTAMP NOT NULL DEFAULT now(), "dataAtualizacao" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3c7f2de70c4765a04c070a9f745" UNIQUE ("placa"), CONSTRAINT "PK_0c3daa1e5d16914bd9e7777cf77" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "veiculos"`);
    }

}
