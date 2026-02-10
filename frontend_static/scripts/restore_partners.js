#!/usr/bin/env node
/*
 * scripts/restore_partners.js
 *
 * Usage: SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/restore_partners.js path/to/backup.json [--yes]
 *
 * It reads the JSON file produced by the backup and inserts the rows back into `partners`.
 * If id fields exist in the dump, the insert preserves them.
 */

import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import readline from 'readline';

const argv = process.argv.slice(2);
if (argv.length < 1) {
  console.error('Usage: node scripts/restore_partners.js path/to/backup.json [--yes]');
  process.exit(1);
}
const backupFile = argv[0];
const yes = argv.includes('--yes');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

function ask(question) {
  return new Promise(res => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(question, answer => { rl.close(); res(answer); });
  });
}

async function main() {
  try {
    if (!fs.existsSync(backupFile)) {
      console.error('Backup file not found:', backupFile);
      process.exit(2);
    }

    const content = fs.readFileSync(backupFile, 'utf8');
    const rows = JSON.parse(content);
    console.log(`Backup contains ${rows.length} rows.`);

    if (!yes) {
      const ans = await ask('Proceed to insert these rows into partners? (type YES to confirm): ');
      if (ans.trim() !== 'YES') { console.log('Aborted by user.'); process.exit(0); }
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
    // Insert rows in batches to avoid big payloads
    const batchSize = 200;
    for (let i = 0; i < rows.length; i += batchSize) {
      const batch = rows.slice(i, i + batchSize);
      const { error } = await supabase.from('partners').insert(batch);
      if (error) throw error;
      console.log(`Inserted batch ${i/batchSize + 1} (${batch.length} rows)`);
    }

    console.log('Restore completed successfully.');
  } catch (err) {
    console.error('Error restoring partners:', err);
    process.exit(3);
  }
}

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const isMain = process.argv[1] === __filename;
if (isMain) await main();
