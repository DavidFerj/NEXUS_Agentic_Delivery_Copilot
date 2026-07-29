# Serverless Firebase architecture requirements

Status: Approved by product-owner request  
Scope: Foundation architecture refactor

## Functional requirements

### SFA-REQ-001 - Monorepo topology

The repository shall expose `frontend/` as the Next.js application root and `gcp/` as the
root for backend deployables, Firebase configuration, shared contracts, and GCP
infrastructure.

### SFA-REQ-002 - Serverless deployment taxonomy

Backend deployables shall be classified as Cloud Run services, functions, or jobs based
on runtime behavior. Internal modules shall not become remote services without evidence
of independent scaling, security, ownership, or lifecycle.

### SFA-REQ-003 - Dynamic frontend hosting

The Next.js application shall target Firebase App Hosting with safe scale-to-zero
defaults, monorepo-aware local emulation, and controlled non-development rollouts.

### SFA-REQ-004 - Managed identity

Firebase Authentication shall establish end-user identity. The control plane remains the
authorization boundary and shall eventually verify Firebase ID tokens and application
membership before protected operations.

### SFA-REQ-005 - Operational state

Firestore shall own orchestration state, checkpoints, progress, and sanitized real-time
projections. PostgreSQL shall retain relational tenancy, membership, approval, audit,
billing, and release authority.

### SFA-REQ-006 - Firestore client boundary

Client reads shall be limited to sanitized tenant projections. All client writes and
unrecognized paths shall be denied. Trusted backend access shall be governed by IAM.

### SFA-REQ-007 - Reproducible Firebase development

The repository shall configure App Hosting, Authentication, and Firestore emulators and
provide executable Firestore Security Rules tests.

### SFA-REQ-008 - Architecture enforcement

Local and CI validation shall detect legacy directory roots, missing deployment
boundaries, invalid Firebase paths, unsafe App Hosting defaults, and weakened Firestore
rules.

## Non-functional requirements

### SFA-NFR-SEC-001 - Identity and isolation

Identity Platform tenant claims are external identity attributes, not trusted application
membership by themselves. App Check is supplemental and shall never replace
authentication or authorization.

### SFA-NFR-REL-001 - Cross-store recovery

No workflow may assume an atomic transaction between PostgreSQL and Firestore. Cross-store
updates require a transactional outbox/inbox, stable idempotency key, aggregate ordering,
bounded retry, dead-letter handling, correlation, observability, and reconciliation.

### SFA-NFR-COST-001 - Bounded serverless cost

Development defaults shall scale to zero and cap instances. Production values, regions,
budgets, and minimum instances require environment-specific approval.

### SFA-NFR-MNT-001 - Deployable independence

Each deployable owns its entry point, dependencies, tests, configuration, IAM identity,
and release lifecycle. Shared packages remain small and have explicit consumers.

## Out of scope

- Creating Firebase or GCP projects and billable resources.
- Enabling production sign-in providers, MFA, SAML, or OIDC.
- Implementing sign-in screens or protected application endpoints.
- Implementing orchestration persistence or cross-store projection workers.
- Publishing branches, deploying App Hosting, or applying Firestore rules remotely.
