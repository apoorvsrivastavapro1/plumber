import { HttpStatus } from '@nestjs/common';
import { IResponseStatusMessage } from '@api/shared/utilities/response/response.interface';

export const responseName = {
    ARTICLE_CREATED: 'ARTICLE_CREATED',
    ARTICLE_SENDED: 'ARTICLE_SENDED',
};

export const responseInfo: Record<string, IResponseStatusMessage> = {
    ARTICLE_CREATED: {
        message: 'Article created successfully',
        statusCode: HttpStatus.CREATED,
    },
    ARTICLE_SENDED: {
        message: 'Article sended successfully',
        statusCode: HttpStatus.OK,
    },
};
