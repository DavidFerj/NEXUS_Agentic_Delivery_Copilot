# Security policy

## Reporting

Do not open a public issue for a suspected vulnerability or exposed secret. Submit a
[private vulnerability report](https://github.com/DavidFerj/NEXUS_Agentic_Delivery_Copilot/security/advisories/new)
with the affected component, impact, reproduction steps, and any suggested mitigation.

If private reporting is unavailable, stop work, preserve evidence without copying
sensitive data, and contact the repository owner through their verified GitHub profile.
Do not send credentials, customer code, or production data.

## Supported versions

Security fixes are applied to the latest commit on `main`. Pre-release work on `develop`
is supported only until it is superseded or promoted. No tagged stable release exists
yet.

We aim to acknowledge a complete report within three business days. Validation and
remediation timelines depend on severity and reproducibility. Reporters should allow a
coordinated remediation window before disclosure.

## Baseline controls

- No production secrets, credentials, personal data, or customer code in this repository.
- Tenant context comes from validated identity, never from an untrusted request parameter.
- Firebase Authentication establishes identity; application authorization and tenant
  membership remain control-plane responsibilities.
- Firestore client writes are denied by default. Server SDKs use per-service IAM and
  never service-account key files.
- App Check is an anti-abuse signal and never replaces authentication or authorization.
- Production rejects development-header authentication.
- Agent execution uses separate ephemeral identities and isolated workspaces.
- Pull requests require deterministic tests and security scanning before promotion.
- Production deployment is never automatic.
- GitHub Actions dependencies are pinned to immutable commit SHAs.
- Confirmed secrets and unwaived critical/high dependency findings block publication.

See `specs/foundation/threat-model.md` for the initial threat analysis.
