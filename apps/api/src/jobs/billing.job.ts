/**
 * Billing reconciliation / webhook retry job.
 */
export class BillingJob {
    static readonly queueName = 'billing';

    async handle(_payload: unknown): Promise<void> {
        // implement
    }
}
