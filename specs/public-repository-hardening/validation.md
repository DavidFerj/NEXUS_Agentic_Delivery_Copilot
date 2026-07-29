# Public repository hardening validation

Evidence date: 2026-07-29
Validated remote commit: `cabc7963f0df42ce7a9ba7b1fd73d3d0c6dc75eb`
Repository visibility: public

Validation is intentionally recorded only after each command or remote control has
executed. The publication gate is complete: the licensed commit passed local and remote
validation before visibility changed to public.

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

| Area                     | Evidence                                                                                                                     | Result                                                                 |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `main` CI                | [GitHub Actions run 30495188721](https://github.com/DavidFerj/NEXUS_Agentic_Delivery_Copilot/actions/runs/30495188721)       | Passed on licensed publication commit: all five jobs                   |
| `develop` CI             | [GitHub Actions run 30495193244](https://github.com/DavidFerj/NEXUS_Agentic_Delivery_Copilot/actions/runs/30495193244)       | Passed on licensed publication commit: all five jobs                   |
| Containers               | Linux Compose rendering, control-plane/web builds, and Trivy image scans                                                     | Passed with no unwaived critical/high finding                          |
| PostgreSQL               | Migration plus live RLS, tenant-FK, and audit-immutability integration tests                                                 | Passed in the `api` job                                                |
| Repository security      | Gitleaks history scan, Trivy filesystem scan, JavaScript/Python audits                                                       | Passed in the `security` job                                           |
| GitHub dependency safety | Vulnerability alerts, automated security fixes, secret scanning, and push protection                                         | Enabled                                                                |
| Code scanning            | [CodeQL Default Setup run 30495602789](https://github.com/DavidFerj/NEXUS_Agentic_Delivery_Copilot/actions/runs/30495602789) | Passed; zero open code-scanning alerts                                 |
| Security alerts          | GitHub API inspection after publication                                                                                      | Zero code-scanning, secret-scanning, and Dependabot alerts             |
| Vulnerability reporting  | GitHub private-vulnerability-reporting API                                                                                   | Enabled                                                                |
| Branch governance        | GitHub branch-protection API for `main` and `develop`                                                                        | PR, CODEOWNERS review, five strict CI checks, linear history, no force |

Docker remains unavailable on the local Windows host; the required Docker checks were
therefore executed and passed on GitHub-hosted Linux runners.

GitHub Free did not enable non-provider secret patterns or validity checks. Provider
pattern scanning, push protection, Gitleaks, filesystem scanning, dependency audits, and
CodeQL remain active.

## Acceptance status

| Criterion  | Status    |
| ---------- | --------- |
| AC-PRH-001 | Completed |
| AC-PRH-002 | Completed |
| AC-PRH-003 | Completed |
| AC-PRH-004 | Completed |
| AC-PRH-005 | Completed |
| AC-PRH-006 | Completed |
| AC-PRH-007 | Completed |
| AC-PRH-008 | Completed |
