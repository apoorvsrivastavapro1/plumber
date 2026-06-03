import { Module } from '@nestjs/common';
import { ArticleController } from './controller/article.controller';
import { ArticleService } from './service/article.service';
import { ArticleRepository } from './repository/article.repository';

@Module({
    controllers: [ArticleController],
    providers: [ArticleService, ArticleRepository],
    exports: [ArticleService, ArticleRepository],
})
export class ArticleModule {}
