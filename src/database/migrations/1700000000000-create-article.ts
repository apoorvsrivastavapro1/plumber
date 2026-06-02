import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateArticle1700000000000 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        // Create the ENUM type first (PostgreSQL requires this)
        await queryRunner.query(
            `CREATE TYPE "article_status_enum" AS ENUM ('PUBLISHED', 'DRAFT', 'ARCHIVED')`,
        );

        await queryRunner.createTable(
            new Table({
                name: 'article',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'status',
                        type: 'enum',
                        enum: ['PUBLISHED', 'DRAFT', 'ARCHIVED'],
                        enumName: 'article_status_enum',
                        default: `'ARCHIVED'`,
                        isNullable: false,
                    },
                    {
                        name: 'is_public',
                        type: 'boolean',
                        isNullable: false,
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'content',
                        type: 'text',
                        isNullable: false,
                    },
                    {
                        name: 'publish_date',
                        type: 'timestamp',
                        isNullable: false,
                    },
                    {
                        name: 'price',
                        type: 'decimal',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                        isNullable: false,
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                        isNullable: false,
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamp',
                        isNullable: true, // null = not deleted (paranoid)
                    },
                ],
            }),
        );

        await queryRunner.createIndex(
            'article',
            new TableIndex({
                name: 'IDX_ARTICLE_TITLE',
                columnNames: ['title'],
            }),
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('article', 'IDX_ARTICLE_TITLE');
        await queryRunner.dropTable('article');
        await queryRunner.query(`DROP TYPE "article_status_enum"`);
    }
}
