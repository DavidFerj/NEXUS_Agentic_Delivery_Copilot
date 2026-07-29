# Public repository hardening validation

Evidence date: 2026-07-29
Validated remote commit: `100918c654d7d15fdc8bee29e7db444770cfc975`
License candidate branch: `dalf/docs/apache-license`

Validation is intentionally recorded only after each command or remote control has
executed. The technical publication gate is open: remote CI is green and the product
owner selected Apache-2.0. Visibility remains private until the licensed commit passes
the same gate.

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

## Remote results

| Area                     | Evidence                                                                                                                                           | Result                                                              |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `main` CI                | [GitHub Actions run 30493814946](https://github.com/DavidFerj/NEXUS_Agentic_Delivery_Copilot/actions/runs/30493814946)                             | Passed: `api`, `web`, `firebase`, `containers`, and `security`      |
| `develop` CI             | [GitHub Actions run 30493821572](https://github.com/DavidFerj/NEXUS_Agentic_Delivery_Copilot/actions/runs/30493821572)                             | Passed: `api`, `web`, `firebase`, `containers`, and `security`      |
| Containers               | Linux Compose rendering, control-plane/web builds, and Trivy image scans                                                                           | Passed with no unwaived critical/high finding                       |
| PostgreSQL               | Migration plus live RLS, tenant-FK, and audit-immutability integration tests                                                                       | Passed in the `api` job                                             |
| Repository security      | Gitleaks history scan, Trivy filesystem scan, JavaScript/Python audits                                                                             | Passed in the `security` job                                        |
| GitHub dependency safety | Vulnerability-alert and automated-security-fix API verification                                                                                    | Enabled                                                             |
| Private-plan controls    | Branch-protection API returned HTTP 403; private-vulnerability-reporting API returned HTTP 404 while the repository remains private on GitHub Free | Deferred until public visibility, where GitHub makes them available |

Docker remains unavailable on the local Windows host; the required Docker checks were
therefore executed and passed on GitHub-hosted Linux runners.

## Acceptance status

| Criterion  | Status                                                                                |
| ---------- | ------------------------------------------------------------------------------------- |
| AC-PRH-001 | Completed                                                                             |
| AC-PRH-002 | Completed                                                                             |
| AC-PRH-003 | Completed                                                                             |
| AC-PRH-004 | Completed                                                                             |
| AC-PRH-005 | Completed                                                                             |
| AC-PRH-006 | Completed                                                                             |
| AC-PRH-007 | Partially completed; public-only GitHub controls remain                               |
| AC-PRH-008 | Gate satisfied; Apache-2.0 selected and licensed commit awaiting final CI/publication |
