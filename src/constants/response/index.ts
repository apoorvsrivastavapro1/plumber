import { IResponseStatusMessage } from 'src/utils/response/response.interface';
import * as CommonResponse from './common_response.constants';
import * as ArticleResponse from './article_response.constants';

// Response action name
export const responseName = {
    ...CommonResponse.responseName,
    ...ArticleResponse.responseName,
};

// Response information
export const responseInfo: Record<string, IResponseStatusMessage> = {
    ...CommonResponse.responseInfo,
    ...ArticleResponse.responseInfo,
};
