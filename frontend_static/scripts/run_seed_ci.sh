#!/usr/bin/env bash
set -euo pipefail

# Wrapper to run the seed script locally or in CI with env vars.
# Usage (local test):
# SUPABASE_URL=https://xxxxx.supabase.co SUPABASE_SERVICE_ROLE_KEY=ey... ADMIN_EMAIL=admin@simjs.com ADMIN_PASSWORD=StrongPass123! ./scripts/run_seed_ci.sh

: "${SUPABASE_URL:?Need SUPABASE_URL}"
: "${SUPABASE_SERVICE_ROLE_KEY:?Need SUPABASE_SERVICE_ROLE_KEY}"
: "${ADMIN_EMAIL:?Need ADMIN_EMAIL}"
: "${ADMIN_PASSWORD:?Need ADMIN_PASSWORD}"

node scripts/create_admin_and_seed.js
