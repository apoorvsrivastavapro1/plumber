# File Processing Pipeline

Modular monolith monorepo for file processing (NestJS API + future Next.js web app).

## Structure

See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) for module boundaries and rules.

## Prerequisites

- Node.js >= 20
- pnpm 9+ (`corepack enable && corepack prepare pnpm@9.15.0 --activate`)

## Setup

```bash
pnpm install
```

Copy environment files to the **repo root** (used by API migrate scripts):

- `.env.development`
- `.env.staging`
- `.env.production`

## Development

```bash
# API (hot reload)
pnpm run start:dev

# Build entire monorepo
pnpm run build
```

API base URL pattern: `http://{host}:{port}/api/v1/...`

Example route (legacy article): `GET /api/v1/articles`

## Database migrations

```bash
NODE_ENV=development pnpm run migrate:up
NODE_ENV=development pnpm run migrate:down
```

## Workspaces

| Package | Path |
|---------|------|
| `@repo/api` | `apps/api` |
| `@repo/web` | `apps/web` (scaffold) |
| `@repo/contracts` | `packages/contracts` |
| `@repo/types` | `packages/types` |
| `@repo/utils` | `packages/utils` |
