#!/usr/bin/env bash
set -euo pipefail

# run_verify.sh
# Usage:
#   SUPABASE_URL=https://... SUPABASE_SERVICE_ROLE_KEY=ey... ./scripts/run_verify.sh

: "${SUPABASE_URL:?Need SUPABASE_URL}"
: "${SUPABASE_SERVICE_ROLE_KEY:?Need SUPABASE_SERVICE_ROLE_KEY}"

echo "Running verification script..."
node scripts/verify_seed.js

if [ -f artifacts/verify_seed_result.json ]; then
  echo "Verification artifact content:" 
  cat artifacts/verify_seed_result.json
else
  echo "Artifact not found: artifacts/verify_seed_result.json"
fi
