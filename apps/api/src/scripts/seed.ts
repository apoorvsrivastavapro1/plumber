/**
 * Database seed entrypoint.
 * Run: pnpm --filter @repo/api exec ts-node -r tsconfig-paths/register src/scripts/seed.ts
 */
async function seed(): Promise<void> {
    // implement when modules have seed data
}

seed().catch(console.error);
