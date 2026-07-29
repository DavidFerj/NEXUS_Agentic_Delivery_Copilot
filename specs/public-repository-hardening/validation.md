# Public repository hardening validation

Evidence date: 2026-07-29
Branch: `dalf/security/public-repository-hardening`

Validation is intentionally recorded only after each command or remote control has
executed. The publication gate remains closed until remote CI and licensing complete.

## Local results

| Area                   | Command or method                                   | Result                                                                         |
| ---------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------ |
| Formatting             | `pnpm format:check`; `uv run ruff format --check .` | Passed; 92 Python/repository files checked                                     |
| Frontend lint/types    | `pnpm lint`; `pnpm typecheck`                       | Passed, including deterministic `next typegen`                                 |
| Frontend tests         | `pnpm test:coverage`                                | Passed: 8 tests; 100% statements/branches/functions/lines                      |
| Frontend build         | `pnpm build`                                        | Passed: Next.js 16 production build                                            |
| Python lint/types      | `uv run ruff check .`; `uv run mypy ...`            | Passed; strict typing across 24 source files                                   |
| Python tests           | `uv run pytest`                                     | Passed: 26; skipped: 1 Docker/PostgreSQL integration; 100% statements/branches |
| Contracts/architecture | `validate_contracts.py`; `validate_architecture.py` | Passed                                                                         |
| Firebase rules         | `pnpm test:firebase`                                | Passed: 5 emulator tests                                                       |
| App Hosting            | `pnpm test:apphosting`                              | Passed: emulator HTTP check                                                    |
| JavaScript audit       | `pnpm audit --audit-level low`                      | Passed: no known vulnerabilities                                               |
| Python audit           | uv export plus `pip-audit==2.9.0`                   | Passed: no known dependency vulnerabilities; local unpublished package skipped |
| Sensitive content      | publication-candidate pattern scan                  | Passed: no high-confidence credential patterns in 151 files                    |
| YAML                   | parse tracked and untracked repository YAML         | Passed: 14 documents                                                           |

Firebase CLI emitted a Node deprecation warning for its own App Hosting subprocess
implementation; the emulator and application check completed successfully.

## CI-dependent checks

Docker is not installed on the local host. The following remain blocking until the first
private GitHub Actions run:

- Compose rendering on Linux;
- both container builds and Trivy image scans;
- live PostgreSQL migration, RLS, cross-tenant FK, and audit immutability integration;
- Gitleaks full-history scan and Trivy filesystem scan;
- GitHub security and branch-control verification.

## Acceptance status

| Criterion  | Status                                                                  |
| ---------- | ----------------------------------------------------------------------- |
| AC-PRH-001 | Pending reconstructed remote history                                    |
| AC-PRH-002 | Partially completed; local scan passed, Gitleaks pending                |
| AC-PRH-003 | Partially completed; ecosystem audits passed, Trivy pending             |
| AC-PRH-004 | Partially completed; local gates passed, Docker/CI pending              |
| AC-PRH-005 | Partially completed; static/unit checks passed, live PostgreSQL pending |
| AC-PRH-006 | Completed                                                               |
| AC-PRH-007 | Partially completed; files added, remote settings pending               |
| AC-PRH-008 | Pending remote CI and license                                           |
