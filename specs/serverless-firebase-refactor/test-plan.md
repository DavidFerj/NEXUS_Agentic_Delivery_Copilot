# Serverless Firebase refactor test plan

## Regression

- Prettier and Ruff formatting;
- ESLint and Ruff linting;
- strict TypeScript and Python type checks;
- existing frontend and control-plane tests with 100% changed business-logic coverage;
- OpenAPI and event schema validation;
- Next.js production build;
- Python workspace lock and installation from the new path.

## Architecture

- required `frontend/` and `gcp/` files exist;
- legacy roots are absent;
- Firebase configuration references versioned rules and indexes;
- App Hosting emulator targets `frontend`;
- App Hosting emulator renders the NEXUS application;
- App Hosting shared defaults scale to zero and cap instances;
- Firestore rules retain tenant matching and deny-by-default writes/fallback.

## Firebase Security Rules

Using the Firestore emulator:

- matching Identity Platform tenant projection read succeeds;
- cross-tenant projection read fails;
- project-level identity without tenant claim fails;
- authenticated client write fails;
- unmatched paths fail.

## Environment-dependent

- Firebase rule tests require Java 21 and the Firestore emulator;
- Compose validation, container builds, and PostgreSQL RLS require Docker;
- App Hosting deployment and remote rule deployment require approved Firebase projects;
- CI execution requires the branch to be published.

Unavailable environment-dependent checks are reported as unverified, never passed.
