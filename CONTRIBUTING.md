# Contributing

## Contribution license

By submitting a contribution, you agree that it is your original work or that you have
the right to submit it, and that it is provided under the repository's
[Apache License 2.0](LICENSE).

## Workflow

1. Start from the current local `develop` state unless the approved task specifies a
   different baseline.
2. Create one short-lived branch for one independent outcome.
3. Link the change to a requirement or acceptance-criterion identifier.
4. Update contracts, migrations, tests, and documentation together.
5. Run `scripts/validate.ps1` before requesting review.

## Pull requests

Keep pull requests small and describe:

- functional outcome and scope;
- architecture and contract changes;
- security and tenant-isolation impact;
- exact validation performed;
- deployment and rollback implications;
- acceptance-criterion status.

Use Conventional Commits. Do not combine unrelated refactors or dependency upgrades with
feature work.

## Reviews

The author or generating agent cannot be the only approver. Security, schema, IAM,
environment, and irreversible-data changes require review by the responsible owner.
