Testing guide - quick commands and checks

Overview
--------
This file shows simple commands to run locally (bash or PowerShell) to:
- run seed (create admin + sample content) using Service Role key
- run verification and inspect artifact JSON
- produce the HTML snippet to test frontend interactions with Supabase

Prerequisites
-------------
- Node.js installed (v16+ recommended). Verify with `node -v` and `npm -v`.
- From project root: npm init -y && npm install node-fetch@2 @supabase/supabase-js
- Have your Supabase project details:
  - SUPABASE_URL (e.g. https://vnzclgsbpemupjxdxljf.supabase.co)
  - SUPABASE_ANON_KEY (for frontend testing)
  - SUPABASE_SERVICE_ROLE_KEY (server-side only; very sensitive)

Run seed (create admin + example content)
----------------------------------------
Bash/macOS/Linux:

export SUPABASE_URL="https://your-project.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="ey..."
export ADMIN_EMAIL="admin@exemplo.com"
export ADMIN_PASSWORD="StrongPass123!"
./scripts/run_seed.sh

PowerShell (Windows):

$env:SUPABASE_URL='https://your-project.supabase.co'
$env:SUPABASE_SERVICE_ROLE_KEY='ey...'
$env:ADMIN_EMAIL='admin@exemplo.com'
$env:ADMIN_PASSWORD='StrongPass123!'
./scripts/run_seed.ps1

Verify in Supabase SQL Editor
-----------------------------
Run these queries in Supabase SQL Editor:

SELECT * FROM profiles WHERE role='admin';
SELECT * FROM content ORDER BY created_at DESC LIMIT 10;
SELECT * FROM partners ORDER BY created_at DESC LIMIT 10;

Run verification locally (writes artifacts/verify_seed_result.json)
------------------------------------------------------------------
Bash:

export SUPABASE_URL="https://your-project.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="ey..."
./scripts/run_verify.sh

PowerShell (Windows):

$env:SUPABASE_URL='https://your-project.supabase.co'
$env:SUPABASE_SERVICE_ROLE_KEY='ey...'
./scripts/run_verify.ps1

Test frontend (inject snippet into <head> for local testing)
-----------------------------------------------------------
Run:

./scripts/print_frontend_snippet.sh

Copy the printed snippet and paste into the <head> of your local HTML pages (only for local testing). Replace the placeholder ANON key with your actual ANON key.

In the browser console (after page loads):

await window.supabaseClient.supabase.from('profiles').select('*').limit(1)

If you get a response (data or empty array), the client config is working.

Force failure & dispatch workflow (optional, advanced)
------------------------------------------------------
This will back up the partners table, delete partners, and dispatch the GitHub Actions workflow.

Requirements:
- SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
- GITHUB_TOKEN (personal access token), GITHUB_OWNER, GITHUB_REPO

Usage:

node scripts/force_failure_and_dispatch.js --yes

Restore partners from backup:

node scripts/restore_partners.js tmp/partners_backup_<ts>.json --yes

Safety and cleanup
------------------
- NEVER put SUPABASE_SERVICE_ROLE_KEY in client-side code.
- If you used the print snippet in HTML for testing, remove it after testing.
- Use the restore script to revert partners after forcing failures.

If you want I can generate a single one-line command tailored with your real SUPABASE_URL (I won't ever ask for your keys) — you'll only paste it into your terminal. Tell me your OS (Windows or Linux/macOS) and which action you want to run first and I provide the exact copy/paste commands.