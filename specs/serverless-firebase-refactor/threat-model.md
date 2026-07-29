# Serverless Firebase refactor threat model

## Assets

- Firebase identities, sessions, tenant claims, and provider configuration;
- tenant workflow state and sanitized projections;
- relational membership, approvals, audit, billing, and releases;
- App Hosting and Cloud Run service identities;
- customer code, artifacts, provider credentials, and delivery evidence.

## Trust boundaries

- browser to Firebase Authentication;
- browser to Firestore Security Rules;
- browser to App Hosting/control plane;
- control plane to Firebase Admin/server SDKs;
- Cloud Run deployable to Cloud Run deployable;
- PostgreSQL to Firestore cross-store projection;
- control plane to isolated execution jobs.

## Threats and controls

| Threat                                            | Primary controls                                               | Residual risk                  |
| ------------------------------------------------- | -------------------------------------------------------------- | ------------------------------ |
| Forged or expired ID token                        | Admin SDK verification, audience/issuer checks, HTTPS          | Identity provider compromise   |
| Tenant claim confused with application membership | Server-side membership lookup and explicit ID mapping          | Provisioning/mapping defect    |
| Cross-tenant Firestore read                       | Tenant claim rule, emulator tests, fail-closed fallback        | Rules regression before CI     |
| Client mutates authoritative state                | Deny all client writes                                         | Overprivileged server identity |
| Server bypasses Security Rules                    | Per-service IAM, ADC, no key files, audit logs                 | IAM misconfiguration           |
| App Check treated as authorization                | Separate identity/policy validation                            | Operational misconfiguration   |
| Cross-store partial failure                       | Idempotency, correlation, repair/replay process                | Delayed projection consistency |
| Automatic production rollout                      | Separate projects, manual rollout and approval                 | Human approval error           |
| Function retry duplicates effects                 | Idempotency keys, bounded retries, DLQ                         | External provider semantics    |
| Execution job exfiltrates data                    | Separate identity/workspace, scoped credentials, egress policy | Runtime/provider compromise    |

Confirmed cross-tenant access, unauthorized writes, exposed credentials, or automatic
production promotion is release-blocking.
