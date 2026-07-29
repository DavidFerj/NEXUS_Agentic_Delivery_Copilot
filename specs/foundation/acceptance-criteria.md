# Foundation acceptance criteria

## AC-FND-001 - Repository contract

Given a new contributor, when they read the root documentation, then they can identify
the product scope, architecture boundaries, canonical commands, security constraints,
and Definition of Done.

## AC-FND-002 - Liveness

Given a running API process, when `GET /health/live` is requested, then it returns HTTP
200, a stable typed payload, and an `X-Request-ID` header.

## AC-FND-003 - Readiness

Given a reachable database, when `GET /health/ready` is requested, then it returns HTTP
200 and reports the database ready. Given an unavailable database, it returns HTTP 503
without exposing connection details.

## AC-FND-004 - Platform information

Given the versioned API, when `GET /api/v1/platform` is requested, then it returns the
product identity, release phase, North Star, and only capabilities implemented by this
foundation.

## AC-FND-005 - Correlation identifier

Given a syntactically valid incoming `X-Request-ID`, the API preserves it. Given a missing
or invalid value, the API generates a UUID and returns it in the response.

## AC-FND-006 - Safe environment configuration

Given staging or production configuration, when development authentication is selected,
then application configuration fails before serving requests.

## AC-FND-007 - Tenant schema

Given a migrated PostgreSQL database, then tenant-owned tables have non-null tenant keys,
RLS is enabled and forced, and policies use transaction-scoped trusted tenant context.

## AC-FND-008 - Web experience

Given the web application at desktop or mobile width, then a keyboard user can navigate
the primary content and perceive API ready, degraded, or unavailable state without
relying on color alone.

## AC-FND-009 - Reproducible local stack

Given a configured local `.env`, when Docker Compose is started, then API and web health
checks become healthy after their dependencies and local state persists only in declared
volumes.

## AC-FND-010 - Quality

Given the foundation diff, when the canonical validation runs, then formatting, linting,
strict typing, unit tests, branch coverage, contract validation, and production builds
pass. New Python business logic and TypeScript behavior achieve 100% statement and branch
coverage.

## AC-FND-011 - Security evidence

Given the repository, when CI security jobs run, then secret scanning and dependency /
filesystem scanning produce deterministic pass/fail evidence and no confirmed secret or
unwaived critical/high finding is accepted.

## AC-FND-012 - Traceability

Each foundation requirement maps to implementation components and at least one
verification method in `traceability.md`.
