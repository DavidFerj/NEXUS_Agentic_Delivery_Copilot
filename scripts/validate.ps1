[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $repoRoot

Write-Host "Validating TypeScript workspace..."
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test:coverage
pnpm build
pnpm audit:dependencies

Write-Host "Validating Python workspace..."
uv run ruff format --check .
uv run ruff check .
uv run mypy gcp/services/control-plane/src
uv run pytest
uv run python scripts/validate_contracts.py
uv run python scripts/validate_architecture.py
New-Item -ItemType Directory -Force -Path ".artifacts" | Out-Null
uv export --frozen --all-packages --all-extras --no-hashes `
  --output-file ".artifacts/python-audit-requirements.txt"
uvx --from pip-audit==2.9.0 pip-audit `
  --skip-editable `
  --requirement ".artifacts/python-audit-requirements.txt"

Write-Host "Validating Firebase rules..."
pnpm test:firebase
pnpm test:apphosting

Write-Host "Validating container configuration..."
docker compose config --quiet
docker build -f gcp/infrastructure/docker/control-plane.Dockerfile .
docker build -f gcp/infrastructure/docker/frontend.Dockerfile .

Write-Host "Foundation validation completed."
