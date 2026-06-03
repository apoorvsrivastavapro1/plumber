/**
 * TypeORM structural configuration for apps/api.
 * Imported by data-source.ts (CLI) and database.provider.ts (runtime).
 */

import { join } from 'path';

export const ENTITY_PATTERNS = [
    join(__dirname, 'src/**/*.entity{.ts,.js}'),
    join(
        __dirname,
        'src/modules/**/infrastructure/persistence/typeorm/*.orm-entity{.ts,.js}',
    ),
];

export const MIGRATION_PATTERNS = [
    join(
        __dirname,
        'src/shared/infrastructure/database/migrations/*{.ts,.js}',
    ),
    join(
        __dirname,
        'src/modules/**/infrastructure/persistence/typeorm/migrations/*{.ts,.js}',
    ),
];

export const MIGRATIONS_TABLE_NAME = 'typeorm_migrations';
