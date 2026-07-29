# Serverless Firebase refactor traceability

| Requirement | Implementation                                        | Verification                       |
| ----------- | ----------------------------------------------------- | ---------------------------------- |
| SFA-REQ-001 | `frontend/`, `gcp/`                                   | architecture validator             |
| SFA-REQ-002 | `gcp/services`, `gcp/functions`, `gcp/jobs`, ADR-0005 | structure and documentation review |
| SFA-REQ-003 | `frontend/apphosting*.yaml`, ADR-0007                 | YAML and architecture validation   |
| SFA-REQ-004 | Firebase/identity architecture docs, ADR-0006         | threat and boundary review         |
| SFA-REQ-005 | ADR-0006, system context, Firebase README             | authority matrix review            |
| SFA-REQ-006 | `firestore.rules`                                     | emulator Security Rules tests      |
| SFA-REQ-007 | `firebase.json`, Firebase package/tests               | Firebase emulator test command     |
| SFA-REQ-008 | validation scripts and GitHub Actions                 | local/CI quality gates             |

## Acceptance criteria

| Criterion  | Test or evidence                            |
| ---------- | ------------------------------------------- |
| AC-SFA-001 | `scripts/validate_architecture.py`          |
| AC-SFA-002 | frontend/API regression gate                |
| AC-SFA-003 | `gcp/README.md` and boundary READMEs        |
| AC-SFA-004 | App Hosting smoke test and YAML validation  |
| AC-SFA-005 | tenant-owned projection Security Rules test |
| AC-SFA-006 | cross-tenant/no-tenant/write denial tests   |
| AC-SFA-007 | ADR-0007 and infrastructure boundary        |
| AC-SFA-008 | CI jobs and architecture validator          |
