import { Column } from 'typeorm';
import { CustomTable } from '@api/shared/utilities/custom-class-validator/validator/customTable';
import { BaseEntity } from '@api/shared/kernel/base.entity';
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
