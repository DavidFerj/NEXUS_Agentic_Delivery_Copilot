# Foundation validation evidence

Evidence date: 2026-07-29  
Branch: `dalf/feat/platform-foundation`

This is historical evidence for the pre-refactor foundation. Current architecture
validation is recorded under `specs/serverless-firebase-refactor/validation.md`.

## Executed successfully

| Area        | Command                                       | Result                                           |
| ----------- | --------------------------------------------- | ------------------------------------------------ |
| Formatting  | `pnpm format:check`                           | Passed                                           |
| Web lint    | `pnpm lint`                                   | Passed                                           |
| Web types   | `pnpm typecheck`                              | Passed                                           |
| Web tests   | `pnpm test:coverage`                          | Passed: 8 tests; 100% statements and branches    |
| Web build   | `pnpm build`                                  | Passed: Next.js production build                 |
| Peers       | `pnpm peers check`                            | Passed                                           |
| Python fmt  | `uv run ruff format --check .`                | Passed: 61 files                                 |
| Python lint | `uv run ruff check .`                         | Passed                                           |
| Python type | `uv run mypy apps/api/src`                    | Passed: 24 source files                          |
| API tests   | `uv run pytest`                               | Passed: 24, skipped: 1; 100% statements/branches |
| Contracts   | `uv run python scripts/validate_contracts.py` | Passed                                           |
| YAML        | Parse all repository YAML documents           | Passed                                           |

## Environment-dependent checks

The host has neither Docker nor an installed WSL distribution. Consequently, these
checks were not executed locally:

- `docker compose config --quiet`;
- API and web container builds;
- full Compose startup and health checks;
- Alembic upgrade against PostgreSQL;
- live PostgreSQL RLS allow/deny behavior;
- container image scanning.

The CI workflow defines deterministic Compose configuration, both container builds,
secret scanning, dependency/filesystem scanning, and a PostgreSQL RLS integration test
using a non-privileged application role. CI execution remains pending until the branch is
published; those environment-dependent checks must pass before this foundation is
promoted beyond development.

## Acceptance-criterion disposition

| Criterion  | Status              | Evidence or limitation                                                             |
| ---------- | ------------------- | ---------------------------------------------------------------------------------- |
| AC-FND-001 | Completed           | Root governance and onboarding documentation review                                |
| AC-FND-002 | Completed           | API liveness route tests                                                           |
| AC-FND-003 | Completed           | Readiness success and safe-failure route tests                                     |
| AC-FND-004 | Completed           | Platform route and contract tests                                                  |
| AC-FND-005 | Completed           | Request-ID middleware tests                                                        |
| AC-FND-006 | Completed           | Fail-closed environment configuration tests                                        |
| AC-FND-007 | Partially completed | Models and policy verified statically; live RLS test configured, execution pending |
| AC-FND-008 | Completed           | Component tests, static accessibility review, production build                     |
| AC-FND-009 | Partially completed | Compose definition implemented; Docker startup/health pending                      |
| AC-FND-010 | Partially completed | Code gates passed; container portion of canonical gate pending                     |
| AC-FND-011 | Partially completed | CI security jobs configured but not executed                                       |
| AC-FND-012 | Completed           | Requirement-to-implementation-to-verification matrix                               |
