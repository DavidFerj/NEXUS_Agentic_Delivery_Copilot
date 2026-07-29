# Secret leak prevention acceptance criteria

## AC-SLP-001 - Ignore coverage

Given representative environment, credential, key, Firebase, Google Cloud, Kubernetes,
Terraform, database, and deployment-state paths, the repository validation confirms that
Git ignores every candidate and that Docker and Google Cloud upload denylist controls
are present.

## AC-SLP-002 - Forbidden tracked paths

Given a sensitive filename is force-added to the Git index, the staged hygiene gate
fails before commit without displaying file contents.

## AC-SLP-003 - High-confidence content

Given a staged file contains a recognized private-key or provider-token pattern, the
hygiene gate reports only the path and credential category and returns a failure.

## AC-SLP-004 - Safe templates

Approved example configuration remains trackable and contains no real credential or
private environment identifier.

## AC-SLP-005 - Local enforcement

The repository provides versioned pre-commit and pre-push hooks and a repository-local
installer. The installed hook path is `.githooks`.

## AC-SLP-006 - CI enforcement

The API and security jobs execute the hygiene validator, all workflow action references
remain SHA-pinned, and the full CI succeeds.

## AC-SLP-007 - GitHub policy

GitHub reports selected actions only, full-SHA pinning required, read-only default
workflow permissions, pull-request approval disabled for the workflow token, secret
scanning and push protection enabled, and zero open secret alerts.

## AC-SLP-008 - Keyless operations and response

An accepted ADR prohibits service-account key files and defines Workload Identity
Federation. The runbook documents safe local/cloud secret handling and rotation-first
incident response.
