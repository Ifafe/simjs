#!/usr/bin/env bash
set -euo pipefail

# print_frontend_snippet.sh
# Usage: ./scripts/print_frontend_snippet.sh
# Prints the HTML snippet to inject into <head> for frontend testing

cat <<'HTML'
<!-- START Supabase env for local testing -->
<script>
  // Replace the placeholders with your real values (only for local testing)
  window.__env = {
    SUPABASE_URL: 'https://vnzclgsbpemupjxdxljf.supabase.co',
    SUPABASE_ANON_KEY: 'pk.REPLACE_WITH_YOUR_ANON_KEY'
  };
</script>
<script src="js/supabaseClient.js"></script>
<script src="js/supabase-integration.js"></script>
<!-- END Supabase env for local testing -->
HTML