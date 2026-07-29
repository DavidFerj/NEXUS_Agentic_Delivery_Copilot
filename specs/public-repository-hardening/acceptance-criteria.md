# Public repository hardening acceptance criteria

## AC-PRH-001 - Published history

Given the remote branches, their reachable commits use Conventional Commit subjects and
the approved GitHub no-reply author identity.

## AC-PRH-002 - Sensitive-content scan

Given the final published tree and history, secret scanning reports no confirmed secret,
and ignored local artifacts are not tracked.

## AC-PRH-003 - Dependency audits

Given the final lockfiles, `pnpm audit --audit-level high`, Python lockfile audit, and
Trivy complete without an unwaived critical/high finding.

## AC-PRH-004 - Deterministic quality gate

Formatting, linting, strict typing, tests, 100% changed-logic coverage, contract checks,
Firebase rules, App Hosting emulator, production build, Compose validation, and container
builds pass locally or in the first CI environment.

## AC-PRH-005 - Relational isolation

Given migrated PostgreSQL and a non-bypass runtime role, missing or mismatched tenant
context cannot read or write tenant rows, cross-tenant workspace references fail, and
audit updates/deletes fail.

## AC-PRH-006 - Cross-store contract

Given an event envelope, missing idempotency or aggregate-ordering metadata is rejected,
and the architecture defines duplicate, replay, version-gap, retry, DLQ, and repair
behavior.

## AC-PRH-007 - Public governance

Security reporting, CODEOWNERS, issue forms, PR guidance, conduct, branch rules, security
alerts, and private vulnerability reporting are configured or an exact GitHub-plan
limitation is recorded.

## AC-PRH-008 - Safe publication

The repository remains private until CI is green and the product owner selects the
license. Only then may visibility be changed to public.
