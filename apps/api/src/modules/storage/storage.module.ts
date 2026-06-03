import { Module } from '@nestjs/common';
import { STORAGE_FACADE, StorageFacade } from './public';

@Module({
    providers: [{ provide: STORAGE_FACADE, useClass: StorageFacade }],
    exports: [STORAGE_FACADE],
})
export class StorageModule {}
