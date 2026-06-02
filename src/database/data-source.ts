import { DataSource } from 'typeorm';
import {
    ENTITY_PATTERNS,
    MIGRATION_PATTERNS,
    MIGRATIONS_TABLE_NAME,
} from '../../typeorm.config';

/**
 * TypeORM CLI data source.
 * Used by migrate:generate / migrate:up / migrate:down scripts.
 * Connection credentials are injected via dotenv-cli from .env.{NODE_ENV}.
 */
export default new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ENTITY_PATTERNS,
    migrations: MIGRATION_PATTERNS,
    migrationsTableName: MIGRATIONS_TABLE_NAME,
});
