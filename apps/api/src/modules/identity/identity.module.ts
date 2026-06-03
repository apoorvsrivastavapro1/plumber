import { Module } from '@nestjs/common';
import { IDENTITY_FACADE, IdentityFacade } from './public';
import { OAuthModule } from './infrastructure/integrations/oauth';

@Module({
    imports: [OAuthModule],
    providers: [{ provide: IDENTITY_FACADE, useClass: IdentityFacade }],
    exports: [IDENTITY_FACADE, OAuthModule],
})
export class IdentityModule {}
