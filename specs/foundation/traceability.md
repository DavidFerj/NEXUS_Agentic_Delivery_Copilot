# Foundation traceability

| Requirement | Implementation                                        | Verification                         |
| ----------- | ----------------------------------------------------- | ------------------------------------ |
| FND-REQ-001 | `specs/`, `AGENTS.md`                                 | Documentation review                 |
| FND-REQ-002 | `frontend/`, `gcp/`                                   | Architecture invariant validation    |
| FND-REQ-003 | `frontend`                                            | Vitest, Next.js build                |
| FND-REQ-004 | `gcp/services/control-plane/src/nexus_api/api/routes` | API route tests, OpenAPI validation  |
| FND-REQ-005 | API request middleware and logging                    | Middleware and error tests           |
| FND-REQ-006 | SQLAlchemy models                                     | Model metadata tests                 |
| FND-REQ-007 | Alembic baseline migration                            | Static tests; PostgreSQL CI test     |
| FND-REQ-008 | API settings                                          | Configuration tests                  |
| FND-REQ-009 | `compose.yaml`, Dockerfiles                           | YAML review; CI Compose/build checks |
| FND-REQ-010 | local validation and GitHub Actions                   | Executed validation evidence         |
| FND-REQ-011 | `gcp/infrastructure/terraform`, deployment ADR        | Architecture review                  |
| FND-REQ-012 | `gcp/services/orchestrator`, ADR-0003                 | Boundary review                      |

## Acceptance criteria to tests

| Acceptance criterion | Test or check                                       |
| -------------------- | --------------------------------------------------- |
| AC-FND-001           | documentation and link checks                       |
| AC-FND-002           | `test_health.py::test_liveness`                     |
| AC-FND-003           | readiness success/failure route tests               |
| AC-FND-004           | platform contract tests                             |
| AC-FND-005           | request-ID middleware tests                         |
| AC-FND-006           | settings environment tests                          |
| AC-FND-007           | model/static tests; PostgreSQL CI integration test  |
| AC-FND-008           | web component tests and production build            |
| AC-FND-009           | CI Compose/build checks; local health check pending |
| AC-FND-010           | `scripts/validate.ps1`                              |
| AC-FND-011           | CI security jobs                                    |
| AC-FND-012           | this matrix                                         |

Execution results and environmental limitations are recorded in `validation.md`.
