import { Injectable } from '@nestjs/common';
import { ArticleRepository } from '../repository/article.repository';
import { CreateArticleDto } from '../dto/create_article.dto';
import { GetAllArticleQueryDto } from '../dto/query_article.dto';

@Injectable()
export class ArticleService {
    constructor(private articleRepository: ArticleRepository) {}

    async createArticle(articleInfo: CreateArticleDto) {
        return await this.articleRepository.create({
            status: articleInfo.status,
            isPublic: articleInfo.isPublic,
            title: articleInfo.title,
            content: articleInfo.content,
            publishDate: articleInfo.publishDate,
            price: articleInfo.price,
        });
    }

    async getAllArticles(getArticleQuery: GetAllArticleQueryDto) {
        const { status, page, perPage } = getArticleQuery;

        return await this.articleRepository.findAndCountAll(
            { ...(status && { status }) },
            {
                page,
                perPage,
                select: { id: true, isPublic: true, title: true },
            },
        );
    }
}
