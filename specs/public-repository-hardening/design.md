# Public repository hardening design

## Delivery sequence

1. Implement all changes on `dalf/security/public-repository-hardening`.
2. Regenerate JavaScript and Python lockfiles and remove vulnerable versions.
3. Validate locally, including history-aware secret scanning.
4. Replace the pre-public branch history with a minimal professional baseline authored
   through the GitHub no-reply address.
5. Create the GitHub repository as private and push only `main` and `develop`.
6. Enable vulnerability reporting, alerts, automated security updates, CodeQL where
   supported, and protected branch rules.
7. Observe the first GitHub Actions run.
8. Apply the selected license and change visibility only after all blocking checks pass.

## Architectural changes

- PostgreSQL uses an owner identity only for a one-shot migration service and a separate
  runtime identity with no superuser or RLS-bypass capability.
- Initial schema constraints enforce tenant/workspace consistency and qualified external
  identity uniqueness.
- Audit immutability combines SELECT/INSERT-only RLS policies with a database trigger
  that rejects update/delete even for an accidental privileged writer.
- Cross-store event metadata and ADRs establish the protocol without prematurely
  implementing an outbox before the first real workflow.
- Next.js types are generated deterministically and ephemeral `next-env.d.ts` is ignored.
- GitHub Actions and scanners form a blocking supply-chain gate.

## Compatibility and rollout

No external consumer or production database exists. The unpublished initial migration
may therefore be corrected in place. After first publication, schema changes require new
forward migrations and contract compatibility analysis.

## Rollback

Before remote publication, rollback is a local branch reset to the preserved pre-public
reference. After publication, revert the baseline commit on private branches; do not
force-push a public branch without a separately approved incident procedure.
