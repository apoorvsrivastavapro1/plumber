import { Global, Module } from '@nestjs/common';
import { databaseProvider, TYPEORM } from './database.provider';
import { DatabaseService } from './database.service';

@Global()
@Module({
    providers: [DatabaseService, databaseProvider],
    exports: [TYPEORM, DatabaseService],
})
export class DatabaseModule {}
