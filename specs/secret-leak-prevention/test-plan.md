# Secret leak prevention test plan

## Automated tests

- Parameterized unit tests verify blocked secret paths and allowed examples.
- Synthetic credentials are assembled only at runtime so no token-shaped fixture is
  stored in the repository.
- Content tests cover private keys, Google, GitHub, AWS, Slack, Stripe, and Google
  service-account JSON detection.
- Tests verify findings never expose matched values.
- The repository validator checks the live index, effective Git ignore behavior,
  Docker context patterns, and gcloud include behavior.
- Architecture validation checks hook, runbook, ADR, and CI-gate presence.

## Security validation

- Run the staged and full-tree hygiene gates.
- Run Gitleaks across complete history.
- Run GitHub secret scanning, CodeQL, dependency review/audits, and Trivy.
- Inspect GitHub Actions provider allowlist, SHA requirement, default token permissions,
  protected checks, and open alert counts.

## Regression and quality

- Ruff formatting and lint.
- Strict mypy for application and repository-security scripts.
- Pytest with 100% statement and branch coverage for changed policy logic.
- Existing frontend, Firebase, contracts, application, build, and container checks.

## Negative testing safety

No real, provider-valid, or copied credential may be used. Tests construct nonfunctional
synthetic values in memory and never print them.
