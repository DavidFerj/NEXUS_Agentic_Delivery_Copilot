# Secret leak prevention validation

Evidence date: 2026-07-29
Validated implementation commit: `dad204d7c07a5fcd97507348e21deafa40812297`

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
| Allowed GitHub Actions    | GitHub-owned plus five explicit third-party repositories              |
| Third-party trust         | Unverified Marketplace actions denied                                 |
| Action reference policy   | Full-length commit SHA required by repository setting                 |
| Default workflow token    | Read-only; pull-request approval disabled                             |
| Existing repository gates | Required PR, CODEOWNERS, strict CI, Gitleaks, CodeQL, push protection |

The initial CI run correctly blocked Trivy because its SHA-pinned
`aquasecurity/setup-trivy` dependency was missing from the new allowlist. Only that
transitive repository was added. The next security run reached Gitleaks, whose current
action requires the automatic workflow token for pull-request scans. The token is now
provided only to the SHA-pinned Gitleaks step and retains repository-wide read-only
permissions.

## Remote validation

| Area                 | Evidence                                                                                                | Result                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Required CI          | [Run 30500600692](https://github.com/DavidFerj/NEXUS_Agentic_Delivery_Copilot/actions/runs/30500600692) | Passed: API, web, Firebase, containers, and security        |
| CodeQL               | [Run 30500598729](https://github.com/DavidFerj/NEXUS_Agentic_Delivery_Copilot/actions/runs/30500598729) | Passed: Python, JavaScript/TypeScript, and GitHub Actions   |
| Secret history       | Gitleaks in the required security job                                                                   | Passed: no detected secret                                  |
| Containers           | Linux builds and Trivy scans in the required containers job                                             | Passed: no unwaived critical/high finding                   |
| Firebase             | Java 21 emulator Rules and App Hosting checks                                                           | Passed                                                      |
| Security alerts      | GitHub code-scanning, secret-scanning, and Dependabot APIs                                              | Zero open alerts                                            |
| Pull request         | [Draft PR 1](https://github.com/DavidFerj/NEXUS_Agentic_Delivery_Copilot/pull/1)                        | Protected `develop` target; all current checks successful   |
| Actions restrictions | Repository API                                                                                          | Selected providers only, full SHA required, token read-only |

GitHub-hosted runners report upstream Node 20 action metadata deprecation warnings while
forcing those actions to Node 24. All affected actions remain SHA-pinned and passed; no
insecure compatibility override was enabled.

## Acceptance status

| Criterion  | Status    |
| ---------- | --------- |
| AC-SLP-001 | Completed |
| AC-SLP-002 | Completed |
| AC-SLP-003 | Completed |
| AC-SLP-004 | Completed |
| AC-SLP-005 | Completed |
| AC-SLP-006 | Completed |
| AC-SLP-007 | Completed |
| AC-SLP-008 | Completed |
