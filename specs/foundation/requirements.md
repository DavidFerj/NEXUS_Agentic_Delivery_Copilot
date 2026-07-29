# Foundation requirements

Status: Approved for implementation  
Scope: Phase 0 - Platform Foundation

## Functional requirements

### FND-REQ-001 - Versioned specification

The repository shall contain a human-readable Delivery Specification Package with stable
requirement and acceptance-criterion identifiers.

### FND-REQ-002 - Monorepo boundaries

The repository shall separate web experience, API control plane, public contracts,
orchestrator boundary, infrastructure, documentation, and product specifications.

### FND-REQ-003 - Product shell

The web application shall present the product identity, current foundation phase,
principal capabilities, and operational API state in a responsive accessible interface.

### FND-REQ-004 - Operational API

The API shall expose liveness, readiness, and versioned platform-information endpoints
with explicit response schemas.

### FND-REQ-005 - Request traceability

Every API response shall carry a validated or generated correlation identifier, and logs
shall record it without logging request bodies or credentials.

### FND-REQ-006 - Tenant-aware data foundation

The persistence model shall establish tenant, user, membership, workspace, initiative,
and audit-event entities. Tenant-owned tables shall include non-null tenant identifiers.

### FND-REQ-007 - Database isolation

PostgreSQL migrations shall enable Row-Level Security for tenant-owned tables and derive
policy context from a transaction-scoped database setting.

### FND-REQ-008 - Environment safety

Configuration shall come from environment variables. Development-header authentication
shall be impossible to enable in staging or production.

### FND-REQ-009 - Local reproducibility

The documented local stack shall start the web, API, PostgreSQL, Redis, object storage,
and telemetry collector without relying on persistent application container disks.

### FND-REQ-010 - Automated quality gate

CI and local validation shall cover formatting, linting, static typing, unit tests,
branch coverage, contract validation, build, dependency review, secret scanning,
filesystem scanning, and container build validation where supported.

### FND-REQ-011 - Deployment boundary

Infrastructure documentation shall define GCP responsibilities and rollback expectations
without deploying or creating production resources.

### FND-REQ-012 - Agent execution boundary

The codebase shall reserve an explicit execution-plane boundary and document that it
cannot share process identity, filesystem, or production credentials with the control
plane.

## Non-functional requirements

### FND-NFR-SEC-001 - Secure defaults

No source-controlled secret or valid shared credential is permitted. External inputs are
validated at trust boundaries, and production rejects development-only identity modes.

### FND-NFR-REL-001 - Diagnosability

Health state, build version, environment, correlation identifiers, and structured logs
must make startup and request failures diagnosable.

### FND-NFR-PERF-001 - Control-plane latency

Non-LLM platform-information endpoints target a 95th-percentile latency below 800 ms in
the reference environment.

### FND-NFR-A11Y-001 - Accessibility

The product shell shall use semantic landmarks, visible focus, sufficient contrast,
reduced-motion support, and keyboard-accessible interactions.

### FND-NFR-MNT-001 - Maintainability

Domain and application code shall not import web-framework, database, or provider SDK
types. Modules shall be separated only by meaningful responsibility.

### FND-NFR-COST-001 - Cost restraint

Local dependencies shall be runnable on the documented 16 GB baseline with optional
services placed behind Compose profiles where appropriate.

## Out of scope for this foundation

- Production identity, SSO, invitations, and account recovery.
- Discovery, Lean Inception, and specification-authoring workflows.
- LangGraph execution and provider SDK integration.
- GitHub App installation and pull-request automation.
- GCP resource creation or any production deployment.
- Billing, quotas, or commercial plan enforcement.
- Customer code execution.
