/**
 * Periodic cleanup (temp files, stale pipeline runs).
 */
export class CleanupJob {
    static readonly queueName = 'cleanup';

    async handle(_payload: unknown): Promise<void> {
        // implement
    }
}
