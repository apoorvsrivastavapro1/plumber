/**
 * Background email dispatch job.
 * Wire to Bull processor in apps/worker or bootstrap when ready.
 */
export class EmailJob {
    static readonly queueName = 'email';

    async handle(_payload: unknown): Promise<void> {
        // implement
    }
}
