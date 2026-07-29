# Public repository hardening threat model

## Assets and boundaries

Assets include source, specifications, tenant data, credentials, package integrity,
release authority, audit evidence, and contributor trust. Boundaries include local Git to
GitHub, workflow to third-party Action, browser to API/Firestore, runtime to PostgreSQL,
and PostgreSQL to Firestore projection processing.

## Priority threats

| Threat                                           | Control                                                                 | Residual risk                                |
| ------------------------------------------------ | ----------------------------------------------------------------------- | -------------------------------------------- |
| Secret or personal data published in history     | Full-history scan, ignore policy, rebuilt history, push protection      | Novel secret format or human disclosure      |
| Vulnerable dependency becomes public baseline    | Lockfile audits, Trivy, Dependabot, blocking CI                         | Newly disclosed vulnerability                |
| Action tag is replaced upstream                  | Full commit SHA pins, least-privilege workflow token                    | Compromise of pinned commit before detection |
| Runtime bypasses tenant RLS                      | Separate non-superuser role, forced RLS, integration test               | Misconfigured production IAM/database role   |
| Cross-tenant relational reference                | Composite tenant/workspace FK                                           | Future schema missing equivalent constraint  |
| Audit evidence is altered                        | INSERT/SELECT-only RLS plus immutable trigger                           | Database superuser can disable controls      |
| Duplicate/out-of-order event corrupts projection | Outbox/inbox, stable idempotency key, aggregate version, DLQ/reconciler | External side effect lacks idempotency       |
| Firestore projection leaks sensitive data        | Versioned allowlist schema, server writer, deny client writes           | Schema/review defect                         |
| Malicious contribution reaches protected branch  | Required CI, review, CODEOWNERS, branch rules                           | Compromised maintainer account               |

Confirmed secret exposure, cross-tenant access, uncontrolled audit mutation, or an
unwaived critical/high vulnerability blocks publication.
