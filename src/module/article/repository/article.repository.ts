import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/utils/base-repository/base_repository.repository';
import { TYPEORM } from 'src/database/database.provider';
import { Article } from '../entity/article.entity';

@Injectable()
export class ArticleRepository extends BaseRepository<Article> {
    constructor(@Inject(TYPEORM) dataSource: DataSource) {
        super(dataSource.getRepository(Article));
    }
}
