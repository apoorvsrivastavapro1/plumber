/**
 * TypeORM structural configuration — equivalent of .sequelizerc.
 * Defines entity/migration paths and the migrations table name.
 * Imported by src/database/data-source.ts (CLI) and database.provider.ts (runtime).
 * Connection credentials live in .env.* files and are read via ConfigService at runtime
 * or directly from process.env by the TypeORM CLI.
 */

import { join } from 'path';

// All files matching *.entity.ts / *.entity.js anywhere under src/
export const ENTITY_PATTERNS = [join(__dirname, 'src/**/*.entity{.ts,.js}')];

// TypeScript migration files
export const MIGRATION_PATTERNS = [
    join(__dirname, 'src/database/migrations/*{.ts,.js}'),
];

// Table that tracks which migrations have been applied
export const MIGRATIONS_TABLE_NAME = 'typeorm_migrations';
