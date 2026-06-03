import { Injectable } from '@nestjs/common';

export const BILLING_FACADE = Symbol('BILLING_FACADE');

@Injectable()
export class BillingFacade {}
