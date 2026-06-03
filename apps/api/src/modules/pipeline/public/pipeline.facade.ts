import { Injectable } from '@nestjs/common';
import { IPipelinePublicContract } from './pipeline.contract';

export const PIPELINE_FACADE = Symbol('PIPELINE_FACADE');

@Injectable()
export class PipelineFacade implements IPipelinePublicContract {}
