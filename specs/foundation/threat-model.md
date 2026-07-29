# Foundation threat model

## Assets

- tenant identity and membership;
- product specifications and evidence;
- repositories and generated code;
- provider credentials and budgets;
- audit and traceability records;
- staging deployment authority.

## Actors

- authenticated tenant members;
- tenant administrators;
- platform operators;
- external model and source-control providers;
- untrusted users and malicious repository/specification content;
- compromised or misbehaving agents.

## Entry points

- browser and public API;
- identity tokens and development headers;
- webhook/event endpoints;
- repository and document ingestion;
- provider responses and tool calls;
- database, queue, object storage, and telemetry exporters.

## Trust boundaries

1. browser to web/API;
2. tenant identity to platform authorization;
3. application to pooled database;
4. control plane to provider;
5. control plane to execution plane;
6. runner to repository, package registries, and staging;
7. tenant data to telemetry and evidence storage.

## Priority abuse cases and controls

| Abuse case                                    | Baseline mitigation                                                       | Residual risk                                              |
| --------------------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Cross-tenant record access                    | Trusted tenant context, scoped queries, forced RLS, isolation tests       | Application or policy defect                               |
| Development identity used in production       | Startup validation rejects the configuration                              | Deployment configuration drift                             |
| Prompt or repository injection changes policy | Data/instruction separation, tool allowlists, independent review          | Novel injection patterns                                   |
| Agent exfiltrates secrets or code             | Separate runners, scoped credentials, egress deny-by-default              | Provider or runtime compromise                             |
| Destructive tool action                       | Explicit task scope, approvals, command policy, no production credentials | Human approval error                                       |
| False completion                              | Deterministic tests/scanners/evidence gates                               | Incomplete test oracle                                     |
| Supply-chain compromise                       | Lockfiles, dependency review, scanning, SBOM roadmap                      | Newly disclosed vulnerability                              |
| Audit tampering                               | Append-only audit design and restricted writers                           | Foundation does not yet provide immutable external storage |
| Denial of wallet/service                      | Future quotas, timeouts, attempt/token budgets                            | Quotas are outside Phase 0                                 |

## Security gate

Unauthorized access, cross-tenant exposure, secret compromise, privilege escalation, or
destructive behavior is release-blocking. Waivers never apply to confirmed secrets or
uncontrolled cross-tenant access.
