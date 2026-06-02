import { Global, Module } from '@nestjs/common';
import { PaginationService } from './pagination.service';
import { PaginationInterceptor } from './pagination.interceptor';

@Global()
@Module({
    providers: [PaginationService, PaginationInterceptor],
    exports: [PaginationService, PaginationInterceptor],
})
export class PaginationModule {}
