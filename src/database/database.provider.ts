import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { DataSource } from 'typeorm';
import { DatabaseService } from './database.service';
import {
    ENTITY_PATTERNS,
    MIGRATION_PATTERNS,
    MIGRATIONS_TABLE_NAME,
} from '../../typeorm.config';

export const TYPEORM = 'TYPEORM';

export const databaseProvider = {
    provide: TYPEORM,
    inject: [ConfigService, WINSTON_MODULE_PROVIDER, DatabaseService],
    useFactory: async (
        configService: ConfigService,
        logger: Logger,
        databaseService: DatabaseService,
    ) => {
        const redisPassword = configService.get<string>('redis.password');

        const dataSource = new DataSource({
            type: 'postgres',
            host: configService.get<string>('database.postgres.host'),
            port: configService.get<number>('database.postgres.port'),
            username: configService.get<string>('database.postgres.username'),
            password: configService.get<string>('database.postgres.password'),
            database: configService.get<string>('database.postgres.database'),
            synchronize: configService.get<boolean>(
                'database.postgres.synchronize',
            ),
            entities: ENTITY_PATTERNS,
            migrations: MIGRATION_PATTERNS,
            migrationsTableName: MIGRATIONS_TABLE_NAME,
            // Query result cache backed by the same Redis instance used by RedisModule
            cache: {
                type: 'ioredis',
                options: {
                    host: configService.get<string>('redis.host'),
                    port: configService.get<number>('redis.port'),
                    username: configService.get<string>('redis.username'),
                    ...(redisPassword && { password: redisPassword }),
                },
                duration: 30_000, // default TTL ms, overridden per-query via cache option
            },
        });

        await dataSource.initialize();

        logger.info('Database connected successfully', {
            database: configService.get('database.postgres.database'),
            host: configService.get('database.postgres.host'),
            port: configService.get('database.postgres.port'),
        });

        await databaseService.seedingData(dataSource);

        return dataSource;
    },
};
