import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '@api/shared/kernel/base_repository.repository';
import { TYPEORM } from '@api/shared/infrastructure/database/database.provider';
import { Article } from '../entity/article.entity';

@Injectable()
export class ArticleRepository extends BaseRepository<Article> {
    constructor(@Inject(TYPEORM) dataSource: DataSource) {
        super(dataSource.getRepository(Article));
    }
}
