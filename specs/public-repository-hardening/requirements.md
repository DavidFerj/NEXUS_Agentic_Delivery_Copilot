# Public repository hardening requirements

## Objective

Publish a professional, reproducible, security-gated foundation without exposing secrets,
personal Git metadata, unsafe defaults, or unresolved high-severity dependency findings.

### PRH-REQ-001 - Clean publication history

The public `main` and `develop` history shall contain intentional Conventional Commits
and a GitHub no-reply author identity. Pre-public experimental commits shall not be
reachable from published branches or tags.

### PRH-REQ-002 - Secret and artifact hygiene

Tracked files and published history shall exclude credentials, environment files,
service-account keys, local tooling state, generated build state, caches, logs, and
customer or production data.

### PRH-REQ-003 - Dependency security

JavaScript and Python lockfiles shall have no unwaived critical or high vulnerability.
CI shall execute ecosystem audits and filesystem scanning.

### PRH-REQ-004 - Supply-chain integrity

GitHub Actions shall use immutable full commit SHAs with Dependabot coverage. Workflow
tokens shall use least privilege and checkout credentials shall not persist.

### PRH-REQ-005 - Tenant and audit integrity

The relational schema shall prevent an initiative from referencing a workspace in
another tenant. Audit events shall be append-only. External identity subjects shall be
qualified by issuer and identity tenant.

### PRH-REQ-006 - Runtime database identity

Local orchestration shall separate schema migration authority from a non-superuser,
`NOBYPASSRLS` application identity. Application replicas shall not run migrations during
startup.

### PRH-REQ-007 - Cross-store reliability

Documentation and event contracts shall define idempotency, aggregate ordering,
transactional outbox/inbox, bounded retry, dead-letter, replay, reconciliation, and
authoritative-store behavior.

### PRH-REQ-008 - Data governance

The repository shall define classification, projection allowlists, retention, deletion,
encryption, residency, logging, and external identity mapping boundaries.

### PRH-REQ-009 - Public governance

The repository shall provide actionable security reporting, ownership, contribution,
conduct, issue, and pull-request guidance. Repository security features and branch
protections shall be enabled before public release where the GitHub plan permits.

### PRH-REQ-010 - Publication gate

`main` and `develop` shall be pushed first to a private repository. The first CI run and
security checks must pass before visibility changes to public. License selection remains
an explicit product-owner decision.
