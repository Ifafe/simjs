#!/usr/bin/env bash
set -euo pipefail

# run_seed.sh
# Usage:
#   SUPABASE_URL=https://... SUPABASE_SERVICE_ROLE_KEY=ey... ADMIN_EMAIL=admin@... ADMIN_PASSWORD=Pass123! ./scripts/run_seed.sh

: "${SUPABASE_URL:?Need SUPABASE_URL}"
: "${SUPABASE_SERVICE_ROLE_KEY:?Need SUPABASE_SERVICE_ROLE_KEY}"
: "${ADMIN_EMAIL:?Need ADMIN_EMAIL}"
: "${ADMIN_PASSWORD:?Need ADMIN_PASSWORD}"

echo "Running seed (create admin + sample content) using Service Role key..."
node scripts/create_admin_and_seed.js

echo "Seed script finished. Check output above for errors. If successful, verify in Supabase SQL Editor."