import { Module } from '@nestjs/common';
import { BILLING_FACADE, BillingFacade } from './public';

@Module({
    providers: [{ provide: BILLING_FACADE, useClass: BillingFacade }],
    exports: [BILLING_FACADE],
})
export class BillingModule {}
