# Serverless Firebase refactor acceptance criteria

## AC-SFA-001 - Repository structure

Given the repository root, then `frontend/` and `gcp/` contain the application and cloud
boundaries, and the former `apps/`, `packages/`, `services/`, and `infrastructure/` roots
do not exist.

## AC-SFA-002 - Existing behavior

Given the refactored paths, then frontend/API tests, strict type checks, contract
validation, and the Next.js production build retain their previous behavior.

## AC-SFA-003 - Deployment classification

Given a contributor, when they inspect `gcp/`, then they can determine when code belongs
in a service, function, job, package, Firebase boundary, or infrastructure boundary.

## AC-SFA-004 - App Hosting

Given Firebase local tooling, then the App Hosting emulator resolves `frontend` as the
application root and shared runtime defaults scale to zero with a bounded maximum.

## AC-SFA-005 - Tenant projection read

Given a Firebase identity containing tenant `tenant-a`, when it reads a projection under
`tenant-a`, then Firestore Security Rules allow it.

## AC-SFA-006 - Firestore isolation

Given the same identity, cross-tenant reads, project-level identities without a tenant,
all client writes, and all unrecognized paths are denied.

## AC-SFA-007 - Environment separation

Documentation requires separate Firebase/GCP projects for development, staging, and
production and prohibits automatic production rollout.

## AC-SFA-008 - Automated enforcement

The architecture validator, Firebase rule tests, and CI jobs fail when structural or
security invariants drift.
