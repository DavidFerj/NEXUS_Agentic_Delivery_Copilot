# Serverless Firebase refactor design

## Decisions

1. Preserve the control plane as a modular monolith, but deploy it as a Cloud Run service.
2. Use Cloud Run functions only for narrow HTTP/CloudEvent adapters.
3. Use Cloud Run jobs for bounded migrations and isolated delivery execution.
4. Use Firebase App Hosting for the dynamic Next.js frontend.
5. Use Firebase Authentication for identity and Identity Platform tenant claims for
   direct tenant projection reads.
6. Use Firestore as the operational workflow-state store and PostgreSQL as the relational
   system of record.

## Dependency direction

```text
frontend
  -> public contracts
  -> Firebase client identity / read-only projections
  -> control-plane HTTP API

Cloud Run trigger adapter
  -> application service
  -> domain
  -> infrastructure clients

control plane / orchestrator
  -> PostgreSQL repositories
  -> Firestore state gateway
  -> event/task gateways
```

Domain and application modules do not import Cloud Run, Functions Framework, Firebase,
Firestore, SQLAlchemy, or FastAPI types. Provider adapters implement their ports at the
infrastructure boundary.

## Data authority

PostgreSQL remains authoritative for tenant UUIDs, user mappings, memberships, roles,
approvals, audit, billing, and release records. Firestore is authoritative for current
orchestration state, checkpoints, progress, and disposable/sanitized UI projections.

An Identity Platform tenant ID is not an internal tenant UUID. Provisioning must create
an explicit, unique, auditable mapping before direct projection reads are enabled. User
subjects are qualified by issuer and identity tenant as defined in ADR-0009.

Cross-store writes follow ADR-0008: authoritative state and an outbox record commit in
PostgreSQL, consumers claim a durable idempotency key, and Firestore projection versions
advance monotonically. Retry, dead-letter, replay, and reconciliation never make
Firestore authoritative for relational state.

## Security flow

1. Firebase Authentication issues an ID token.
2. The frontend sends it to the control plane.
3. The control plane verifies signature, audience, issuer, expiry, revocation policy, and
   expected identity tenant.
4. Application membership and authorization are resolved from trusted relational data.
5. App Check may be validated as an independent anti-abuse signal.
6. Backend Firestore access uses Application Default Credentials and per-service IAM.

Security Rules protect only client SDK traffic; they do not protect server SDK traffic.

## Hosting

App Hosting builds the monorepo application rooted at `frontend`, produces a managed
Cloud Run revision, and serves through the managed CDN/load balancer path. Base
configuration is safe across environments. Environment-specific API URLs and secrets are
provided by per-project App Hosting configuration after provisioning approval.

Development may roll out automatically. Staging and production use explicitly selected
commits and manual approval.

## Other Firebase services

App Check and Emulator Suite are part of the architecture. Cloud Storage for Firebase
is deferred because server-managed Cloud Storage already owns evidence/artifacts; it will
be adopted only if a browser upload requirement justifies client SDK and Storage Rules.
Remote Config, Analytics, Messaging, Realtime Database, and Extensions remain deferred.
