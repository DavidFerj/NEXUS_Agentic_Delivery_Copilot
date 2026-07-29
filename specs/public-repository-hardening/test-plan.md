# Public repository hardening test plan

## Static and unit checks

- Prettier, ESLint, Next type generation, TypeScript, Ruff, mypy.
- Frontend component and behavior tests with statement and branch coverage.
- Python API, settings, safe diagnostics, persistence metadata, contracts, and database
  engine tests with statement and branch coverage.

## Integration and contract checks

- PostgreSQL migration upgrade/downgrade and live RLS using a `NOBYPASSRLS` role.
- Cross-tenant initiative FK rejection and audit mutation rejection.
- Firestore same-tenant read, cross-tenant denial, client-write denial, and fallback
  denial.
- App Hosting emulator response and Next.js production build.
- JSON Schema validation for valid and incomplete event envelopes.
- Compose rendering and both production container builds.

## Security and publication checks

- `pnpm audit --audit-level high`.
- `uv export --frozen ...` followed by `pip-audit --requirement ...`.
- Gitleaks full-history scan.
- Trivy filesystem scan for critical/high findings.
- Review tracked filenames and ignore behavior.
- Confirm immutable Action SHAs and least-privilege permissions.
- Confirm private vulnerability reporting, alerts, automated security updates, CodeQL,
  and branch rules through GitHub API.
- Confirm first CI conclusion before any public visibility change.

## Negative cases

- Missing or mismatched tenant context.
- Cross-tenant workspace reference.
- Audit UPDATE and DELETE.
- Missing event idempotency metadata.
- Development authentication in shared environments.
- API discovery defaults in production.
- Sensitive exception text in responses and logs.
