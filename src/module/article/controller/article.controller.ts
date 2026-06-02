import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateArticleDto } from '../dto/create_article.dto';
import { ArticleService } from '../service/article.service';
import { LoggerService } from 'src/utils/debugger/service/logger.service';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { GetAllArticleQueryDto } from '../dto/query_article.dto';
import { ResponseCustom } from 'src/utils/response/response.decorator';
import { responseName } from 'src/constants/response';
import { Pagination } from 'src/utils/pagination/pagination.decorator';

@Controller()
export class ArticleController {
    constructor(
        private logger: LoggerService,
        private articleService: ArticleService,
        private paginationService: PaginationService,
    ) {}

    @ResponseCustom(responseName.ARTICLE_CREATED)
    @Post()
    createArticle(@Body() articleInfo: CreateArticleDto) {
        this.logger.info('Create article info', { articleInfo });

        return this.articleService.createArticle(articleInfo);
    }

    @Get()
    @Pagination()
    @ResponseCustom(responseName.ARTICLE_SENDED)
    async getAllArticles(@Query() getArticleQuery: GetAllArticleQueryDto) {
        this.logger.info('Getting all articles', { getArticleQuery });

        return await this.articleService.getAllArticles(getArticleQuery);
    }
}
