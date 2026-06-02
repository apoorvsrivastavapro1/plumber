import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/utils/pagination/dto/paginationQueryParam.dto';
import { ARTICLE_STATUS } from '../constants/article.constant';

export class GetAllArticleQueryDto extends PaginationDto {
    @IsOptional()
    @IsEnum(ARTICLE_STATUS)
    status: ARTICLE_STATUS;
}
