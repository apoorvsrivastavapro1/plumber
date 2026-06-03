import { Module } from '@nestjs/common';
import { PIPELINE_FACADE, PipelineFacade } from './public';
import { ArticleModule } from './_article_legacy/article.module';

@Module({
    imports: [ArticleModule],
    providers: [{ provide: PIPELINE_FACADE, useClass: PipelineFacade }],
    exports: [PIPELINE_FACADE, ArticleModule],
})
export class PipelineModule {}
