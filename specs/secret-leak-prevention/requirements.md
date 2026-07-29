# Secret leak prevention requirements

## Objective

Reduce the probability and blast radius of accidentally publishing credentials, private
configuration, provider state, or sensitive data from a public repository without
creating a fragile or burdensome development workflow.

## Functional requirements

### SLP-REQ-001 - Sensitive path exclusion

Git, Docker build contexts, and Google Cloud source uploads shall exclude environment
files, credentials, private keys, provider state, Terraform state and variable values,
database exports, local deployment state, and secret directories.

Approved example templates shall remain trackable and contain only non-production
placeholders.

### SLP-REQ-002 - Tracked-content policy

An automated repository gate shall reject forbidden sensitive paths and
high-confidence credential patterns in staged or tracked content. Diagnostics shall
identify the file and category without printing the secret value.

### SLP-REQ-003 - Shift-left enforcement

Versioned pre-commit and pre-push hooks shall run the repository hygiene gate. Hook
installation shall be explicit, repository-local, reproducible, and documented.

### SLP-REQ-004 - CI enforcement

The protected `security` check and the API quality gate shall execute repository hygiene
validation. Existing Gitleaks history scanning, GitHub secret scanning, push protection,
dependency scanning, CodeQL, and protected-branch requirements shall remain active.

### SLP-REQ-005 - Keyless cloud access

Future GitHub-to-Google Cloud deployment shall use short-lived Workload Identity
Federation with least-privilege, environment-specific service identities. Long-lived
service-account key files are prohibited.

### SLP-REQ-006 - GitHub Actions supply-chain policy

GitHub Actions shall allow only GitHub-owned actions and explicitly approved third-party
repositories. Every action reference shall use a full-length immutable commit SHA, and
the default workflow token shall remain read-only and unable to approve pull requests.

### SLP-REQ-007 - Leak response

Documentation shall define prevention, private reporting, immediate credential
revocation or rotation, evidence handling, history cleanup, and post-incident
revalidation.

## Non-functional requirements

- Controls fail closed when their required runtime is unavailable.
- No control shall emit detected secret values.
- Policy logic shall be deterministic, cross-platform, typed, and fully covered.
- False positives require an explicit reviewed policy change, not a silent bypass.
- The solution shall not introduce production deployment or production credentials.
