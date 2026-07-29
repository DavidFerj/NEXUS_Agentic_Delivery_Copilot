# NEXUS Agentic Delivery Copilot

## Purpose

This repository implements the Idea-to-Staging Agentic Delivery Copilot. The product
turns approved business intent into verifiable software in staging while preserving
human control, deterministic evidence, tenant isolation, and end-to-end traceability.

## Source of truth

1. Approved requirements and acceptance criteria under `specs/`.
2. Architecture decisions under `docs/adrs/`.
3. Versioned contracts under `gcp/packages/contracts/`.
4. Implementation and automated tests.

Do not silently change product behavior or acceptance criteria to simplify an
implementation. Record material decisions as ADRs.

## Architecture boundaries

- `frontend`: Next.js user experience and App Hosting configuration. It does not enforce
  authorization.
- `gcp/services`: cohesive Cloud Run HTTP services.
- `gcp/functions`: narrow, idempotent request or CloudEvent adapters.
- `gcp/jobs`: finite Cloud Run tasks such as migrations and isolated execution.
- `gcp/packages/contracts`: public API and event contracts.
- `gcp/firebase`: Firebase rules, indexes, emulator tests, and BaaS policy.
- `gcp/infrastructure`: local and cloud deployment definitions.
- `specs`: Delivery Specification Package for the product itself.

Dependencies point inward: transport and infrastructure may depend on application and
domain modules; domain modules never depend on FastAPI, SQLAlchemy, or provider SDKs.
The execution plane must not share production credentials or identity with the control
plane.

## Canonical commands

Run commands from the repository root:

```text
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
uv sync --all-packages --all-extras
uv run ruff check .
uv run ruff format --check .
uv run mypy gcp/services/control-plane/src scripts
uv run pytest
uv run python scripts/validate_architecture.py
uv run python -m scripts.validate_repository_hygiene
pnpm test:firebase
docker compose up --build
```

On Windows, `scripts/validate.ps1` executes the complete local quality gate.

## Engineering rules

- Python 3.12+, strict type checking, Ruff, pytest, and branch coverage.
- TypeScript strict mode, ESLint, Vitest, semantic HTML, and keyboard accessibility.
- New or modified business logic requires 100% statement and branch coverage.
- All tenant-owned records and queries include trusted tenant context.
- Validate every external input and normalize provider output at the boundary.
- Outbound calls use explicit timeouts; retries are bounded and only for safe operations.
- Use structured logs with correlation identifiers and no secrets or sensitive payloads.
- Database changes require an Alembic migration, rollback notes, and isolation tests.
- Firebase client access is deny-by-default; server SDK access requires least-privilege
  IAM because Admin/server libraries bypass Firestore Security Rules.
- Repository hooks and CI reject sensitive filenames and high-confidence secret patterns.
- Google Cloud deployment uses short-lived Workload Identity Federation; service-account
  key files are prohibited.
- A new deployable boundary requires independent scaling, security, lifecycle, or
  ownership evidence. Internal modules are not microservices.
- Never promote automatically to production.

## Definition of Done

A change is complete only when its acceptance criteria are traced to tests, relevant
format/lint/type/build/security checks pass, documentation and contracts are current,
deployment implications are described, and remaining risks are explicit.
