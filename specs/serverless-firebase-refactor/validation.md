# Serverless Firebase refactor validation

Evidence date: 2026-07-29  
Branch: `dalf/refactor/gcp-firebase-architecture`

## Completed validation

| Area               | Command                                          | Result                                                                |
| ------------------ | ------------------------------------------------ | --------------------------------------------------------------------- |
| JavaScript install | `pnpm install --frozen-lockfile --offline`       | Passed; all four workspace projects resolved from the lockfile        |
| Formatting         | `pnpm format:check`                              | Passed                                                                |
| Frontend lint      | `pnpm lint`                                      | Passed with zero warnings                                             |
| TypeScript         | `pnpm typecheck`                                 | Passed for `@nexus/web` and `@nexus/firebase`                         |
| Frontend tests     | `pnpm test:coverage`                             | Passed; 8 tests, 100% statements/branches/functions/lines             |
| Frontend build     | `pnpm build`                                     | Passed; Next.js 16.2.12 production build                              |
| Peer dependencies  | `pnpm peers check`                               | Passed; no peer dependency issues                                     |
| Python install     | `uv sync --frozen --all-packages --all-extras`   | Passed; 60 packages audited                                           |
| Python formatting  | `uv run ruff format --check .`                   | Passed; 78 files formatted                                            |
| Python lint        | `uv run ruff check .`                            | Passed                                                                |
| Python types       | `uv run mypy gcp/services/control-plane/src`     | Passed; 24 source files                                               |
| Python tests       | `uv run pytest`                                  | Passed; 24 tests, 1 environment-dependent test skipped, 100% coverage |
| Contracts          | `uv run python scripts/validate_contracts.py`    | Passed                                                                |
| Architecture       | `uv run python scripts/validate_architecture.py` | Passed                                                                |
| Firestore rules    | `pnpm test:firebase`                             | Passed; 5 emulator tests                                              |
| App Hosting        | `pnpm test:apphosting`                           | Passed; Next.js started from `frontend/` and `/` returned HTTP 200    |
| Patch integrity    | `git diff --check`                               | Passed; only Windows line-ending conversion notices                   |

The App Hosting run emitted Node.js `DEP0190` from Firebase CLI's internal child-process
launch. It did not originate in application code and did not affect the successful smoke
test.

## Environment-limited validation

| Check                                          | Status      | Evidence or blocker                                                  |
| ---------------------------------------------- | ----------- | -------------------------------------------------------------------- |
| PostgreSQL Row-Level Security integration test | Not run     | Pytest skipped it because Docker is unavailable                      |
| `docker compose config --quiet`                | Not run     | `docker` is not installed or available on `PATH`                     |
| Control-plane and frontend container builds    | Not run     | Docker is unavailable                                                |
| GitHub Actions and configured security scans   | Not run     | Branch was not published; repository has no configured `origin`      |
| Remote App Hosting rollout and Firestore rules | Not run     | No Firebase project/resource creation or deployment was authorized   |
| Authentication providers and Identity Platform | Not enabled | Requires environment/project decisions, billing, IAM, and deployment |

## Acceptance-criterion status

| Criterion  | Status              | Evidence                                                       |
| ---------- | ------------------- | -------------------------------------------------------------- |
| AC-SFA-001 | Completed           | Architecture validator confirms new roots and absent old roots |
| AC-SFA-002 | Completed           | Regression, type, contract, coverage, and build gates passed   |
| AC-SFA-003 | Completed           | `gcp/` taxonomy and ADR-0005                                   |
| AC-SFA-004 | Completed           | App Hosting smoke test and bounded scale configuration         |
| AC-SFA-005 | Completed           | Same-tenant Firestore projection read test                     |
| AC-SFA-006 | Completed           | Cross-tenant/no-tenant/write/fallback denial tests             |
| AC-SFA-007 | Completed           | Separate-project and controlled-rollout policy                 |
| AC-SFA-008 | Partially completed | Local enforcement passed; remote CI execution remains pending  |

No Firebase/GCP resources were created, no remote rules were applied, and no application
or infrastructure deployment was performed.
