import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set as environment variables.');
  process.exit(2);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } });

import fs from 'fs';

async function runChecks() {
  const result = {
    status: 'unknown',
    failures: [],
    admins_count: 0,
    content_count: 0,
    partners_count: 0,
    admins: [],
    content_sample: [],
    partners_sample: [],
    error: null
  };

  try {
    console.log('Running verification queries...');

    // 1) Ensure there's at least one admin profile
    const { data: admins, error: adminErr } = await supabase.from('profiles').select('id, username, full_name, role').eq('role', 'admin').limit(5);
    if (adminErr) throw adminErr;
    console.log(`Admins found: ${admins?.length ?? 0}`);
    result.admins_count = admins?.length ?? 0;
    result.admins = admins || [];

    // 2) Count content
    const { data: contentRows, error: contentErr } = await supabase.from('content').select('id,title,type,status,created_at').order('created_at', { ascending: false }).limit(10);
    if (contentErr) throw contentErr;
    console.log(`Content rows (sample up to 10): ${contentRows?.length ?? 0}`);
    result.content_count = contentRows?.length ?? 0;
    result.content_sample = contentRows || [];

    // 3) Count partners
    const { data: partnersRows, error: partnersErr } = await supabase.from('partners').select('id,company_name,status').limit(10);
    if (partnersErr) throw partnersErr;
    console.log(`Partners rows (sample up to 10): ${partnersRows?.length ?? 0}`);
    result.partners_count = partnersRows?.length ?? 0;
    result.partners_sample = partnersRows || [];

    // Basic validation
    if (!admins || admins.length === 0) result.failures.push('No admin profile found.');
    if (!contentRows || contentRows.length === 0) result.failures.push('No content rows found (expected at least 1 page/post).');
    if (!partnersRows || partnersRows.length === 0) result.failures.push('No partners found (expected at least 1).');

    if (result.failures.length > 0) {
      result.status = 'failed';
      console.error('Verification FAILED:');
      result.failures.forEach(f => console.error('- ' + f));
      // write artifact
      try { fs.mkdirSync('artifacts', { recursive: true }); fs.writeFileSync('artifacts/verify_seed_result.json', JSON.stringify(result, null, 2)); } catch (wErr) { console.error('Failed to write artifact', wErr); }
      process.exit(3);
    }

    result.status = 'passed';
    console.log('Verification PASSED. Seed looks good.');
    console.log('\nSample admin(s):', admins);
    console.log('\nSample content:', contentRows);
    console.log('\nSample partners:', partnersRows);

    // write artifact
    try { fs.mkdirSync('artifacts', { recursive: true }); fs.writeFileSync('artifacts/verify_seed_result.json', JSON.stringify(result, null, 2)); } catch (wErr) { console.error('Failed to write artifact', wErr); }

    process.exit(0);
  } catch (err) {
    console.error('Error running verification:', err);
    result.status = 'error';
    result.error = String(err);
    try { fs.mkdirSync('artifacts', { recursive: true }); fs.writeFileSync('artifacts/verify_seed_result.json', JSON.stringify(result, null, 2)); } catch (wErr) { console.error('Failed to write artifact', wErr); }
    process.exit(4);
  }
}

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const isMain = process.argv[1] === __filename;
if (isMain) await runChecks();
