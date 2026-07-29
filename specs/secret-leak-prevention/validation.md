# Secret leak prevention validation

Evidence date: 2026-07-29

Validation evidence is recorded only after the corresponding command or remote control
has completed.

## Local results

| Area                        | Result                                                                 |
| --------------------------- | ---------------------------------------------------------------------- |
| Git/Docker/gcloud denylist  | Passed: every representative sensitive path is excluded                |
| Staged forbidden-path probe | Passed: harmless forced `service-account.json` path was blocked        |
| Staged content probe        | Passed: nonfunctional private-key marker was blocked and not displayed |
| Repository hooks            | Installed locally; pre-commit execution passed on the intended index   |
| Repository hygiene          | Passed for staged and all tracked files                                |
| Formatting and lint         | Prettier and Ruff passed                                               |
| Static typing               | TypeScript and strict mypy passed across 27 Python source files        |
| Python tests                | Passed: 56; skipped: 1 Docker/PostgreSQL integration; 100% coverage    |
| Frontend tests              | Passed: 8; 100% statement/branch/function/line coverage                |
| Frontend build              | Passed: Next.js production build                                       |
| Contracts and architecture  | Passed                                                                 |
| JavaScript dependency audit | Passed: no known vulnerabilities                                       |
| Python dependency audit     | Passed: no known vulnerabilities; unpublished local package skipped    |

Firebase Rules validation could not run locally because Java is not installed in this
host's `PATH`. App Hosting validation reached the emulator but port `5002` was already
owned by an existing Node process. Both checks remain required in GitHub-hosted CI,
which configures Java 21 and an isolated network namespace.

Docker is unavailable on this Windows host; container builds, live PostgreSQL isolation,
and Trivy image scans remain required in GitHub-hosted CI.

## Remote controls applied

| Control                   | Result                                                                |
| ------------------------- | --------------------------------------------------------------------- |
| Allowed GitHub Actions    | GitHub-owned plus four explicit third-party repositories              |
| Third-party trust         | Unverified Marketplace actions denied                                 |
| Action reference policy   | Full-length commit SHA required by repository setting                 |
| Default workflow token    | Read-only; pull-request approval disabled                             |
| Existing repository gates | Required PR, CODEOWNERS, strict CI, Gitleaks, CodeQL, push protection |
| Pending branch validation | Draft PR CI, Gitleaks history scan, Firebase, containers, and CodeQL  |

## Acceptance status

| Criterion  | Status              |
| ---------- | ------------------- |
| AC-SLP-001 | Completed           |
| AC-SLP-002 | Completed           |
| AC-SLP-003 | Completed           |
| AC-SLP-004 | Completed           |
| AC-SLP-005 | Completed           |
| AC-SLP-006 | Partially completed |
| AC-SLP-007 | Partially completed |
| AC-SLP-008 | Completed           |
