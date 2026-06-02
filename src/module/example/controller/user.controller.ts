import { Body, Controller, Post, Req, Get, Query } from '@nestjs/common';
import { Request } from 'express';
import { responseName } from 'src/constants/response';
import { HttpExceptionWrapper } from 'src/utils/error/error.http.wrapper';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { ResponseCustom } from 'src/utils/response/response.decorator';
import { CreateNewUserDTO } from '../dto/create_user.dto';
import { UserInfoDto } from '../dto/intersection.dto.';
import { UserService } from '../service/user.service';
import { PickLoginField } from '../dto/pick.login-filed.dto';
import { OmitLoginField } from '../dto/omit-fields.dto';
import { PartialFields } from '../dto/partialFields.dto';
import { Common } from '../dto/common.dto';
import { IsNonEmptyStringDto } from '../dto/is_non_empty_string.dto';
import { IsSortValueDTO } from '../dto/is_sort_value.dto';
import { DEFAULT_ERROR, COMMON_ERROR } from 'src/constants/error';
import { RedisService } from 'src/utils/redis/service/redis.service';
import { LoggerService } from 'src/utils/debugger/service/logger.service';
@Controller()
export class UserController {
    constructor(
        private userService: UserService,
        private paginationService: PaginationService,

        //making RedisService instance so that we use all the methods we define in RedisService calss
        private redis: RedisService,
        private logger: LoggerService,
    ) {}

    @ResponseCustom(responseName.USER_CREATED)
    @Post()
    async getUsers(@Req() req: Request, @Body() userInfo: CreateNewUserDTO) {
        this.logger.error('User info by custom logger', { userInfo });

        throw new HttpExceptionWrapper(COMMON_ERROR.CUSTOM_COMMON_ERROR, [
            {
                field: 'email',
                error: 'email already exists',
            },
        ]);

        return;
        // normal response
        await this.userService.getAllUser(userInfo);

        // pagination response
        const metadata = this.paginationService.getPaginationMetadata(req, 20);

        return {
            data: ['pagination'],
            metadata,
        };
    }

    @Post('/static-error')
    staticError() {
        // Don't use
        // throw new Error('User already exists');

        // Http wrapper error
        throw new HttpExceptionWrapper(DEFAULT_ERROR.DEFAULT, [
            {
                field: 'email',
                error: 'email already exists',
            },
        ]);

        // Http Error
        // throw new HttpException('name alreay exixts', 200);

        // badRequest Error
        // throw new BadRequestException({});

        return;
    }

    /**
     * @param {UserInfoDto} userInfo; //In userInfoDTo we extends addressDto property through IntersectionType.
     * validatepipe will validate all the fields of addresDto and userInfoDTo
     */
    @Post('/nested-dto')
    nestedDto(@Body() userInfo: UserInfoDto) {
        console.log('user==', userInfo);
    }

    /**
     * @param {PickLoginField} loginData;In PickLoginField Dto we have only 2 property (picked by another Dto).
     * validationPipe will validate the picked proprties(email and password)
     */
    @Post('/pick-login-field')
    pickLoginField(@Body() loginData: PickLoginField) {
        console.log('login_payload==', loginData);
    }

    /**
     * @param {OmitLoginField} loginData; //In OmitLoginField DTo we have only two property username and password.
     * omit the email with the help of OmitType mapped Utility so user can login with only username and password
     */
    @Post('/omit-login-field')
    omitField(@Body() loginData: OmitLoginField) {
        console.log('login_payload==', loginData);
    }

    /**
     * @param {PartialFields} data; here validationpipe will validate fields passed by the client
     * client can send one or more fields (which are the part of PartialFieldsDTo) in payload
     */
    @Post('/partial-fields')
    partialField(@Body() data: PartialFields) {
        console.log('partial_data==', data);
    }

    @Post('/check-type-count')
    checkTypeCount(@Body() data: Common) {
        console.log(data);
    }

    @Post('/is-non-empty-string')
    isNonEmptyString(@Body() data: IsNonEmptyStringDto) {
        console.log(data);
    }

    @Get('/is-sort-value')
    isSortValue(@Query() data: IsSortValueDTO) {
        console.log(data);
    }

    @Get('/literal-queries')
    async literalQueries() {
        return this.userService.getCount();
    }
    @Get('set-value-in-redis')
    async storeDataInRedis() {
        this.logger.info('rest-value-in-redis');
        return await this.redis.setValue<string | number | boolean>(
            'company_name', // key
            'delta tech gaming limited', //value
            10, //ttl (its optional you can pass ttl in case of true(ispermanent) only)
        );
    }

    @Get('get-value-from-redis')
    async getValueFromRedis() {
        this.logger.info('get-value-from-redis');
        return await this.redis.getValue('company_name');
    }
}
