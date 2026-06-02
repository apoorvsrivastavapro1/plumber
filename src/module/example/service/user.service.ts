import { Injectable } from '@nestjs/common';
import { CreateNewUserDTO } from '../dto/create_user.dto';
import { OtherServiceGatewayService } from 'src/service-gateway/service/other_service.service';
import { UserRepository } from '../repository/user.repository';
import { totalEntriesCountQuery } from '../entity/literal_queries';

@Injectable()
export class UserService {
    constructor(
        private otherServiceGatewayService: OtherServiceGatewayService,
        private userRepository: UserRepository,
    ) {}

    async getAllUser(userInfo: CreateNewUserDTO) {
        console.log({ userInfo });

        await this.otherServiceGatewayService.getHelperData({
            resetToken: 'reset token',
        });

        return 'Sending all user';
    }

    async getCount() {
        const [sql, alias] = totalEntriesCountQuery({
            newPropertyName: 'count_of_admin',
            queryCondition: [{ propertyName: 'role', value: ['Admin'] }],
        });

        return this.userRepository
            .createQueryBuilder('user')
            .select(sql, alias)
            .getRawOne();
    }
}
