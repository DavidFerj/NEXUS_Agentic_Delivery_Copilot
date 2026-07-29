# NEXUS Agentic Delivery Copilot

NEXUS is a human-governed product-delivery platform that turns validated business intent
into tested software deployed to staging, with deterministic evidence and traceability
from outcome to release.

This repository starts with the Phase 0 foundation:

- a versioned Delivery Specification Package (DSP);
- a moderately modular FastAPI control plane;
- an accessible Next.js product shell;
- Firebase Authentication, Firestore, App Hosting, and emulator boundaries;
- tenant-aware PostgreSQL models and Row-Level Security migrations;
- reproducible local infrastructure;
- structured logging, health/readiness contracts, testing, security checks, and CI.

Agent orchestration, discovery workflows, GitHub automation, cloud executors, billing,
and autonomous delivery are intentionally represented by contracts and architecture
boundaries, not placeholder implementations.

## Repository map

```text
frontend/               Next.js application and App Hosting configuration
gcp/
  services/             Cloud Run HTTP services
  functions/            Narrow HTTP/CloudEvent functions
  jobs/                 Finite Cloud Run jobs
  packages/             Shared contracts and intentionally small libraries
  firebase/             Firestore rules, indexes, emulator tests, and BaaS policy
  infrastructure/       Containers, observability, and Terraform boundary
specs/                  Product DSP and foundation specification
docs/
  adrs/                 Architecture decision records
  architecture/         System views and data governance
  runbooks/             Operational and recovery procedures
```

The JavaScript workspace uses pnpm with a minimal Turborepo graph so Firebase App
Hosting can resolve the frontend root through its supported monorepo build path.

## Prerequisites

- Node.js 24 and pnpm 11
- Python 3.12 and uv
- Java 21 for Firebase Emulator Suite
- Docker Desktop with Docker Compose

## Local setup

1. Copy `.env.example` to `.env` and replace the local-only placeholder passwords.
2. Install dependencies:

   ```text
   pnpm install
   uv sync --all-packages --all-extras
   ```

3. Install this checkout's versioned security hooks:

   ```text
   uv run python scripts/install_repository_hooks.py
   ```

4. Start the Firebase emulators in one terminal:

   ```text
   pnpm emulators:firebase
   ```

5. Start the containerized local environment in another terminal:

   ```text
   docker compose up --build
   ```

6. Open the web application at `http://localhost:3000`.
7. Check the API at `http://localhost:8000/health/live`.

The API refuses development-header authentication in staging or production. No default
credential is valid outside a local environment.

The local database uses separate owner/migration and non-superuser runtime identities so
normal API traffic exercises the same forced-RLS boundary expected in managed
environments.

## Quality gate

Windows:

```text
powershell -ExecutionPolicy Bypass -File scripts/validate.ps1
```

Portable commands are documented in [AGENTS.md](AGENTS.md). The detailed test strategy,
security model, and requirement-to-test mapping live under `specs/foundation/`.

Security vulnerabilities must be reported privately according to [SECURITY.md](SECURITY.md).
Credential handling and leak response are defined in the
[secret-management runbook](docs/runbooks/secret-management.md).
Cross-store reliability and data handling are defined in
[ADR-0008](docs/adrs/0008-reliable-cross-store-events.md) and
[data governance](docs/architecture/data-governance.md).

## Firebase hosting decision

The dynamic Next.js application targets Firebase App Hosting. Traditional Firebase
Hosting remains suitable for static exports or explicit rewrites to an independently
managed Cloud Run service, but it is not the baseline for this SSR application. App
Hosting rollouts are automatic only in development environments; staging and production
remain controlled promotion steps.

## Delivery model

`main` is the protected release branch, `develop` is the integration branch, and
short-lived branches carry one traceable change. Production promotion always requires a
separate workflow and explicit human approval.

## License

Licensed under the [Apache License 2.0](LICENSE). Contributions are accepted under the
same license unless explicitly agreed otherwise.
