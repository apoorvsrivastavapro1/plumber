import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserRepository } from './repository/user.repository';
import { PaginationModule } from 'src/utils/pagination/pagination.module';
import { ServiceGatewayModule } from 'src/service-gateway/service_gateway.module';
import { RedisModule } from 'src/utils/redis/redis.module';

@Module({
    imports: [PaginationModule, ServiceGatewayModule, RedisModule],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [],
})
export class UserModule {}
