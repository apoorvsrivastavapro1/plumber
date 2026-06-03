import { Module } from '@nestjs/common';
import { CoreModule } from '@api/bootstrap/core.module';
import { AppController } from './app.controller';
import { AppRouterModule } from './app.router';
import { IdentityModule } from '@api/modules/identity/identity.module';
import { PipelineModule } from '@api/modules/pipeline/pipeline.module';
import { StorageModule } from '@api/modules/storage/storage.module';
import { NotificationsModule } from '@api/modules/notifications/notifications.module';
import { BillingModule } from '@api/modules/billing/billing.module';

@Module({
    imports: [
        CoreModule,
        IdentityModule,
        PipelineModule,
        StorageModule,
        NotificationsModule,
        BillingModule,
        AppRouterModule.register(),
    ],
    controllers: [AppController],
})
export class AppModule {}
