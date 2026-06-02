# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run start:dev          # Hot-reload dev server (NODE_ENV=development)
npm run start:stage        # Staging server
npm run start:prod         # Production server
npm run start:debug        # Debug mode with inspector

# Build & Quality
npm run build              # Compile TypeScript
npm run lint               # ESLint with auto-fix
npm run format             # Prettier on all .ts files

# Database
npm run migrate:generate -- src/database/migrations/create-user   # Generates {timestamp}-create-user.ts
npm run migrate:up         # Run pending migrations
npm run migrate:down       # Revert last migration

# Testing (Jest with ts-jest)
npx jest                   # Run all tests
npx jest --testPathPattern="article"   # Run tests for a specific module
npx jest --coverage        # Run with coverage report
```

Tests are in `*.spec.ts` files co-located with the source. Jest rootDir is `src/`.

## Architecture

This is a NestJS boilerplate using **TypeORM + PostgreSQL** and **Redis**, structured around a layered module pattern.

### Module Hierarchy

```
AppModule
└── CoreModule              # All shared infrastructure (imported once here)
    ├── ConfigModule        # @nestjs/config with per-env .env files
    ├── WinstonModule       # Structured logging
    ├── ErrorModule         # Global ErrorHttpFilter exception handling
    ├── DatabaseModule      # TypeORM forRootAsync (autoLoadEntities: true)
    ├── PaginationModule    # Pagination decorator + interceptor
    ├── ServiceGatewayModule# HTTP calls to external services
    └── RedisModule         # Redis client provider
AppRouterModule             # Dynamically mounts feature modules at path prefixes
└── ArticleModule → /articles
```

Feature modules live in `src/module/`. The `src/module/example/` (UserModule) is a reference implementation demonstrating all conventions — use it as a template when creating new modules.

### Request Lifecycle

1. **Validation** — Global `ValidationPipe` (whitelist, forbidNonWhitelisted) at `main.ts`
2. **Routing** — URI versioning enabled; default version `v1`; global prefix `api`
3. **Response formatting** — `@Response()` decorator on controllers applies `ResponseDefaultInterceptor` to wrap output in a standard envelope
4. **Error handling** — `ErrorHttpFilter` catches all exceptions and standardizes error responses

### BaseRepository Pattern

All repositories extend `BaseRepository<T>` (`src/utils/base-repository/`), which wraps TypeORM's `Repository<T>` and provides: `findOne`, `findAll`, `findAndCountAll`, `create`, `update`, `delete`, `exists`, `createQueryBuilder`. Pagination (page/perPage → take/skip) defaults to page=1, perPage=50. All find methods accept an optional `cache` option (boolean / ms / `{ id, milliseconds }`).

```ts
// Inject the global DATA_SOURCE token, pass entity repository to super()
constructor(@Inject(DATA_SOURCE) dataSource: DataSource) {
  super(dataSource.getRepository(MyEntity));
}
```

`DatabaseModule` is `@Global()` — `DATA_SOURCE` is available in every module without importing `DatabaseModule`. **Do not use `TypeOrmModule.forFeature()`** — entities are auto-discovered via glob in `typeorm.config.ts`.

### BaseEntity

All entities extend `BaseEntity` (`src/utils/base-entity/base.entity.ts`), which provides a UUID v7 primary key (generated via `@BeforeInsert`), `createdAt`, and `updatedAt`.

### typeorm.config.ts

Root-level file (`typeorm.config.ts`) is the `.sequelizerc` equivalent — defines `ENTITY_PATTERNS`, `MIGRATION_PATTERNS`, and `MIGRATIONS_TABLE_NAME`. Referenced by both `data-source.ts` (CLI) and `database.provider.ts` (runtime).

### Response & Error Constants

- Response codes and messages live in `src/constants/response/`
- Error definitions live in `src/constants/error/`
- Always add new response/error constants here rather than inline in services

### Database Migrations

TypeORM CLI uses `src/database/data-source.ts`. Set `DB_SYNCHRONIZE=true` in dev/staging (auto-syncs schema). For production use `migrate:up`. Migration files live in `src/database/migrations/`. See `1700000000000-create-article.ts` as a reference.

## Naming Conventions

| Target | Convention | Example |
|--------|-----------|---------|
| Folders | kebab-case | `base-repository/` |
| Files | snake_case | `article.service.ts` |
| Classes | PascalCase | `ArticleService` |
| Variables & functions | camelCase | `findArticleById` |
| Interfaces | camelCase with `i` prefix | `iArticleInfo` |

## Environment

Copy `.env.example` to `.env.development` / `.env.staging` / `.env.production`. The active file is selected by `NODE_ENV`. Required variables:

- `APP_*` — host, port, versioning, debug flag
- `DB_*` — PostgreSQL connection (dialect, host, port, credentials, name)
- `REDIS_*` — Redis URL, password, database index, TTL

## Commit Convention

Commits are enforced by commitlint. Valid types: `feature`, `fix`, `improve`.

```
feature: add user authentication module
fix: correct pagination offset calculation
improve: refactor base repository generics
```
