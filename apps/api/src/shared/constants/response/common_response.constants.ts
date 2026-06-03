import { HttpStatus } from '@nestjs/common';
import { IResponseStatusMessage } from '@api/shared/utilities/response/response.interface';

export const responseName = {
    USER_CREATED: 'USER_CREATED',
};

export const responseInfo: Record<string, IResponseStatusMessage> = {
    USER_CREATED: {
        message: 'User created successfully',
        statusCode: HttpStatus.CREATED,
    },
};
