import { Column } from 'typeorm';
import { CustomTable } from 'src/utils/custom-class-validator/validator/customTable';
import { BaseEntity } from 'src/utils/base-entity/base.entity';
import { ARTICLE_STATUS } from '../constants/article.constant';

@CustomTable('article')
export class Article extends BaseEntity {
    @Column({
        type: 'enum',
        enum: ARTICLE_STATUS,
        default: ARTICLE_STATUS.ARCHIVED,
    })
    status: ARTICLE_STATUS;

    @Column()
    isPublic: boolean;

    @Column()
    title: string;

    @Column({ type: 'text' })
    content: string;

    @Column()
    publishDate: Date;

    @Column({ type: 'decimal' })
    price: number;
}
