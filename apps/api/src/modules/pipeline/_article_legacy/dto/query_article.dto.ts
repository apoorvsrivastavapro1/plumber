import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from '@api/shared/utilities/pagination/dto/paginationQueryParam.dto';
import { ARTICLE_STATUS } from '../constants/article.constant';

export class GetAllArticleQueryDto extends PaginationDto {
    @IsOptional()
    @IsEnum(ARTICLE_STATUS)
    status: ARTICLE_STATUS;
}
