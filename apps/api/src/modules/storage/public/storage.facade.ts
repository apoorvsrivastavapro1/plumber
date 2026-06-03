import { Injectable } from '@nestjs/common';

export const STORAGE_FACADE = Symbol('STORAGE_FACADE');

@Injectable()
export class StorageFacade {}
