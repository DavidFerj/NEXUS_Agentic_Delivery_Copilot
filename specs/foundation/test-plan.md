# Foundation test plan

## Unit tests

- environment validation and secure defaults;
- platform information contract;
- request-ID validation/generation;
- public error mapping;
- tenant identifier and role behavior;
- web operational-state presentation.

## Integration tests

- FastAPI routes with dependency overrides;
- readiness success and database-failure behavior;
- migration upgrade/downgrade syntax;
- PostgreSQL RLS policy behavior when Docker is available.

## Contract tests

- OpenAPI 3.1 document validation;
- implementation route/status/schema comparison;
- backward-compatible API path and field checks in later changes.

## Component tests

- product shell semantic landmarks;
- accessible labels and status text;
- ready, degraded, and unavailable API states;
- reduced-motion and responsive CSS are covered by build/static inspection.

## Security tests

- production plus development-auth configuration is rejected;
- invalid correlation identifiers are not reflected;
- exception responses do not expose connection strings or stack traces;
- RLS denies access with missing/mismatched tenant context;
- secret and dependency scanners execute in CI.

## Coverage

New and changed business behavior requires 100% statement and branch coverage. Coverage
does not replace behavior assertions.

## Environment-dependent checks

Docker integration, container scanning, and Compose health validation require a working
Docker daemon. A missing daemon is reported as an environmental blocker and never as a
passing check.
