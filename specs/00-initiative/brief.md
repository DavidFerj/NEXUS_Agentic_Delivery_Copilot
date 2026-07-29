# Initiative brief: Idea-to-Staging Agentic Delivery Copilot

## Problem

Product intent is fragmented across meetings, documents, tickets, repositories, tests,
and deployment systems. Teams repeatedly translate an incomplete "what" into technical
plans, while isolated AI assistants can produce persuasive output without deterministic
evidence or governed permissions.

## Product vision

Build a human-governed platform that converts validated business specifications into
tested software deployed to staging, preserving explicit approvals and traceability from
outcome to release.

## North Star

Convert business intent into verifiable software while keeping people in control and
evidence as the source of truth.

## MVP boundary

The first executable outcome is a complete, auditable vertical slice for a small
multi-tenant Customer Feedback Portal:

1. capture an initiative;
2. produce an editable MVP definition;
3. approve one epic, two features, and three to five Gherkin stories;
4. create architecture, API, data, security, and test artifacts;
5. execute implementation in isolated workspaces;
6. run deterministic quality and security gates;
7. create a reviewed pull request;
8. deploy to staging and preserve a complete evidence chain.

Autonomous production promotion is outside scope.

## Baseline decisions

- Local-first and GCP-first with provider abstractions.
- Next.js/TypeScript frontend and FastAPI/Python control plane.
- Modular monolith before evidence justifies service extraction.
- PostgreSQL/pgvector as system of record with pooled tenancy and RLS.
- Codex as the primary coding provider, without desktop-UI runtime coupling.
- LangGraph as the future durable orchestration engine.
- GitHub as source control and initial CI/CD system.

## Source

Derived from `Brief_Proyecto_Idea_to_Staging_Agentic_Delivery_Copilot.docx`,
baseline version 1.0 dated 2026-07-29. The source document remains outside this
repository until the product owner decides how it should be versioned.
