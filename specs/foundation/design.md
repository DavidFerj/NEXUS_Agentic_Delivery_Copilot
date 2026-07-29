# Foundation design

## Architectural style

The initial control plane is a modular monolith. This keeps transactions, authorization,
deployment, and local operation simple while retaining module boundaries that can be
extracted only when scaling, security, or lifecycle evidence requires it.

```text
Browser
  -> Next.js web on Firebase App Hosting
      -> Firebase Authentication
      -> FastAPI control plane on Cloud Run
          -> application services
              -> domain
          -> PostgreSQL
          -> Firestore operational state/projections
          -> Redis (future jobs/cache)
          -> object storage (future DSP/evidence)

Control plane
  -> execution contract
      -> isolated runner (future, separate identity and workspace)
```

## Component responsibilities

### Web

Server-rendered product shell and future structured editors. The UI may hide unavailable
actions for usability but never serves as an authorization boundary.

### API

Transport adaptation, configuration, policy enforcement, orchestration entry points,
database transactions, public contracts, and operational diagnostics.

### Domain

Tenant, workspace, initiative, audit, and future specification/execution concepts. Domain
types remain independent of frameworks and provider SDKs.

### Contracts

OpenAPI and event schemas are versioned independently from persistence models. A contract
change requires producer/consumer analysis and compatibility evidence.

### Persistence

Pooled PostgreSQL is the baseline. Application queries remain tenant-scoped and RLS is a
defense-in-depth control. The API sets trusted tenant context inside each transaction.

Firestore complements PostgreSQL rather than replacing it. It owns orchestration state,
checkpoints, and explicitly sanitized real-time projections. Relational tenancy,
authorization, approvals, audit, billing, and release records remain in PostgreSQL.
Cross-store workflows use idempotent events and never pretend to be one atomic
transaction.

### Execution plane

Reserved as an explicit separate boundary. Future runners are ephemeral, receive
task-scoped credentials and allowlists, deny egress by default, and preserve evidence
before teardown.

## Request flow

1. The API validates or creates a request identifier.
2. Authentication establishes user identity and trusted tenant membership.
3. Authorization evaluates role, resource, action, environment, and policy.
4. The transaction sets database tenant context.
5. Application services execute domain behavior through repository interfaces.
6. The API maps typed outcomes to public DTOs.
7. Structured logs and audit events record safe diagnostic context.

## Error contract

External errors use a stable problem-details structure with a machine-readable code,
human-safe title/detail, HTTP status, and request identifier. Internal causes remain in
structured server logs.

## Deployment evolution

- Local: Docker Compose.
- Development/staging: Firebase App Hosting, Authentication/Identity Platform, Firestore,
  Cloud Run, Cloud SQL, Cloud Storage, Pub/Sub/Cloud Tasks, Secret Manager, Artifact
  Registry, and OpenTelemetry export.
- Production: separate approval workflow; no autonomous coding-agent access.

No Terraform resource is applied in this foundation.
