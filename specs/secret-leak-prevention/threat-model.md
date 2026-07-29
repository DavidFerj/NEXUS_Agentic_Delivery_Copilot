# Secret leak prevention threat model

## Assets and actors

Assets include Google Cloud and Firebase credentials, GitHub tokens, database access,
Terraform state, customer data, deployment configuration, source integrity, and public
CI logs. Actors include maintainers, external contributors, compromised developer
machines, malicious dependencies/actions, and opportunistic scanners of public commits.

## Entry points and trust boundaries

- Developer working tree, Git index, commit, and push.
- Forked pull requests and workflow changes.
- Docker and gcloud upload contexts.
- GitHub Actions dependencies, token permissions, logs, and artifacts.
- Future GitHub OIDC exchange with Google Cloud.

## Abuse cases

| Abuse case                                    | Mitigation                                                        | Residual risk                                  |
| --------------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------- |
| `.env` or service-account JSON is force-added | Filename gate, local hooks, CI, CODEOWNERS                        | Intentional local bypass before public push    |
| Secret uses an unknown filename               | Content rules, Gitleaks, GitHub provider scanning/push protection | Novel or obfuscated secret format              |
| Secret enters Docker/gcloud upload context    | Independent Docker denylist and gcloud Git-ignore import          | Upload from an unsupported nested source root  |
| Workflow introduces a malicious action        | Provider allowlist, SHA requirement, CODEOWNERS, required review  | Approved upstream action commit is compromised |
| Workflow token modifies repository content    | Read-only default and workflow permissions                        | Future job is intentionally over-permissioned  |
| Long-lived GCP key is stolen                  | Keys prohibited; OIDC/WIF short-lived credentials                 | Cloud trust condition or IAM misconfiguration  |
| Secret appears in a log or incident report    | No payload logging, redacted findings, private reporting          | Human copying outside automated controls       |
| Deleted credential remains usable             | Rotation-first incident response and history scan                 | Delayed provider revocation                    |

## Release blockers

A confirmed credential, private customer data, unauthorized workflow permission, missing
required security gate, or unreviewed cloud trust expansion blocks merge and
publication. Security findings cannot be waived merely to make CI pass.
