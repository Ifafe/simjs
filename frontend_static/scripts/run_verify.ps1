# run_verify.ps1
# Usage (PowerShell):
#   $env:SUPABASE_URL='https://...'; $env:SUPABASE_SERVICE_ROLE_KEY='ey...'; ./scripts/run_verify.ps1

if (-not $env:SUPABASE_URL) { Write-Error 'SUPABASE_URL is required'; exit 1 }
if (-not $env:SUPABASE_SERVICE_ROLE_KEY) { Write-Error 'SUPABASE_SERVICE_ROLE_KEY is required'; exit 1 }

Write-Host 'Running verification script...'
node scripts/verify_seed.js

if (Test-Path 'artifacts/verify_seed_result.json') {
  Write-Host 'Verification artifact content:'
  Get-Content artifacts/verify_seed_result.json | Write-Host
} else {
  Write-Host 'Artifact not found: artifacts/verify_seed_result.json'
}
