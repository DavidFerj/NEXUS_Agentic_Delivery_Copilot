# Secret leak prevention design

## Defense in depth

```text
local files
  -> Git/Docker/gcloud denylist
  -> staged hygiene hook
  -> tracked hygiene pre-push hook
  -> GitHub push protection
  -> required PR security job
  -> Gitleaks history scan + dependency/image/filesystem scans
  -> protected develop/main
```

No individual layer is treated as a complete security boundary. Filename policy catches
high-risk artifacts even when their contents use an unknown format. Content detection
catches selected high-confidence formats even when the filename is harmless. Gitleaks
and GitHub provider patterns provide broader independent detection.

## Components

- `.gitignore` excludes private local and provider state while retaining explicit
  examples.
- `.dockerignore` independently removes sensitive paths from container build contexts.
- `.gcloudignore` imports the Git denylist for root-based Google Cloud source uploads.
- `scripts/repository_hygiene.py` contains pure path and content policy.
- `scripts/validate_repository_hygiene.py` reads content from the Git index, verifies
  effective ignore behavior, and emits redacted findings.
- `.githooks` shifts validation before commit and push. The installer changes only the
  current checkout's local Git configuration.
- CI executes the same validator before promotion.
- ADR-0010 defines keyless cloud identity; the secret-management runbook defines
  operational handling and response.

## Security properties

- Index blobs are read through Git instead of following working-tree symlinks.
- Git commands execute without a shell.
- Findings never contain matching content.
- Missing Python blocks local hooks.
- Workflow permissions remain read-only, and third-party actions are allowlisted and
  SHA-pinned.

## Trade-offs

Some filenames, such as private-key extensions and Terraform variable files, are denied
even when a particular file might contain harmless content. This is an intentional
secure default; a legitimate exception requires an explicit review and narrow policy
change.

GitHub Free does not provide every generic/AI secret detection or push-ruleset feature
available on higher plans. Local policy, Gitleaks, provider push protection, and required
CI provide compensating controls but do not create risk zero.
