import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1717373974972 implements MigrationInterface {
    name = 'Initial1717373974972'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "imgUrl" character varying NOT NULL DEFAULT 'img#', "categoryIdId" uuid, CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ordersDetails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, CONSTRAINT "PK_d1fff5666a3601a3a7a786a3cd9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "userIdId" uuid, "orderDetailsId" uuid, CONSTRAINT "REL_cb8486eaad7a292ff78b37d761" UNIQUE ("orderDetailsId"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(50) NOT NULL, "address" text NOT NULL, "phone" character varying NOT NULL, "country" character varying(50) NOT NULL, "city" character varying(50) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_order_details_id_orders_details" ("productsId" uuid NOT NULL, "ordersDetailsId" uuid NOT NULL, CONSTRAINT "PK_99bbd2f1adf7106ebb778d66736" PRIMARY KEY ("productsId", "ordersDetailsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5729338bde99d4975542220199" ON "products_order_details_id_orders_details" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ef337d70a14b8f783c14be4f47" ON "products_order_details_id_orders_details" ("ordersDetailsId") `);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_33b88e166df04f2d9291628bebb" FOREIGN KEY ("categoryIdId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_916c66b74d50fe7cad01e3e5895" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_cb8486eaad7a292ff78b37d7610" FOREIGN KEY ("orderDetailsId") REFERENCES "ordersDetails"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_order_details_id_orders_details" ADD CONSTRAINT "FK_5729338bde99d49755422201993" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_order_details_id_orders_details" ADD CONSTRAINT "FK_ef337d70a14b8f783c14be4f478" FOREIGN KEY ("ordersDetailsId") REFERENCES "ordersDetails"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_order_details_id_orders_details" DROP CONSTRAINT "FK_ef337d70a14b8f783c14be4f478"`);
        await queryRunner.query(`ALTER TABLE "products_order_details_id_orders_details" DROP CONSTRAINT "FK_5729338bde99d49755422201993"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_cb8486eaad7a292ff78b37d7610"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_916c66b74d50fe7cad01e3e5895"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_33b88e166df04f2d9291628bebb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ef337d70a14b8f783c14be4f47"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5729338bde99d4975542220199"`);
        await queryRunner.query(`DROP TABLE "products_order_details_id_orders_details"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "ordersDetails"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
