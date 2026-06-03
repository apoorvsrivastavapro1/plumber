import { Injectable } from '@nestjs/common';
import { IIdentityPublicContract } from './identity.contract';

export const IDENTITY_FACADE = Symbol('IDENTITY_FACADE');

@Injectable()
export class IdentityFacade implements IIdentityPublicContract {}
