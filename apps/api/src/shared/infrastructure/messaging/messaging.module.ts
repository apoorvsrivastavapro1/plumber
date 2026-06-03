import { Global, Module } from '@nestjs/common';

/**
 * Placeholder for Bull queues / event bus wiring.
 * Expand when async cross-module messaging is required.
 */
@Global()
@Module({
    providers: [],
    exports: [],
})
export class MessagingModule {}
