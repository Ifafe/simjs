# run_seed.ps1
# Usage (PowerShell):
#   $env:SUPABASE_URL='https://...'; $env:SUPABASE_SERVICE_ROLE_KEY='ey...'; $env:ADMIN_EMAIL='admin@...'; $env:ADMIN_PASSWORD='Pass123!'; ./scripts/run_seed.ps1

if (-not $env:SUPABASE_URL) { Write-Error 'SUPABASE_URL is required'; exit 1 }
if (-not $env:SUPABASE_SERVICE_ROLE_KEY) { Write-Error 'SUPABASE_SERVICE_ROLE_KEY is required'; exit 1 }
if (-not $env:ADMIN_EMAIL) { Write-Error 'ADMIN_EMAIL is required'; exit 1 }
if (-not $env:ADMIN_PASSWORD) { Write-Error 'ADMIN_PASSWORD is required'; exit 1 }

Write-Host 'Running seed (create admin + sample content) using Service Role key...'
node scripts/create_admin_and_seed.js

Write-Host 'Seed script finished. Check output above for errors. If successful, verify in Supabase SQL Editor.'