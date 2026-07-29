# Public repository hardening traceability

| Requirement | Implementation                                                | Verification                               |
| ----------- | ------------------------------------------------------------- | ------------------------------------------ |
| PRH-REQ-001 | Rebuilt Git history and no-reply author                       | Remote log/API inspection                  |
| PRH-REQ-002 | `.gitignore`, `.gitattributes`, removed generated local state | Gitleaks and tracked-file scan             |
| PRH-REQ-003 | Dependency overrides, updated Python range/lock, audit CI     | pnpm audit, exported-lock pip-audit, Trivy |
| PRH-REQ-004 | SHA-pinned CI, Dependabot, restricted checkout                | Workflow review and first CI               |
| PRH-REQ-005 | Models and initial Alembic migration                          | Metadata tests and PostgreSQL integration  |
| PRH-REQ-006 | Compose migrator/runtime split and PostgreSQL init role       | Compose validation and RLS integration     |
| PRH-REQ-007 | Event envelope, ADR-0008, recovery runbook                    | JSON Schema tests and document review      |
| PRH-REQ-008 | Data governance and ADR-0009                                  | Architecture/threat review                 |
| PRH-REQ-009 | SECURITY, CODEOWNERS, templates, conduct, GitHub settings     | File review and GitHub API                 |
| PRH-REQ-010 | Private-first publication sequence                            | CI run and repository visibility API       |

Final execution evidence is recorded in `validation.md`.
