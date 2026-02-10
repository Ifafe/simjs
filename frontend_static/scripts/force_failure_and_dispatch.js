#!/usr/bin/env node
/*
 * scripts/force_failure_and_dispatch.js
 *
 * Usage (server-side):
 * SUPABASE_URL=https://... SUPABASE_SERVICE_ROLE_KEY=ey... GITHUB_TOKEN=ghp_xxx GITHUB_OWNER=owner GITHUB_REPO=repo node scripts/force_failure_and_dispatch.js [--yes] [--workflow create-admin-seed.yml] [--ref main]
 *
 * What it does:
 * - Backs up current `partners` rows to tmp/partners_backup_<ts>.json
 * - Deletes all rows from `partners` (using service role key)
 * - Dispatches the specified GitHub Actions workflow (default: create-admin-seed.yml) on the given ref
 * - Prints the dispatched workflow run URL
 *
 * WARNING: Uses the Supabase Service Role key (bypass RLS). Run only on a secure machine.
 */

import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js';
import readline from 'readline';

const argv = process.argv.slice(2);
const ARGS = { yes: false, workflow: 'create-admin-seed.yml', ref: 'main' };
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === '--yes') ARGS.yes = true;
  if (a === '--workflow' && argv[i+1]) { ARGS.workflow = argv[++i]; }
  if (a === '--ref' && argv[i+1]) { ARGS.ref = argv[++i]; }
}

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;

function ask(question) {
  return new Promise(res => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(question, answer => { rl.close(); res(answer); });
  });
}

async function main() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }
  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    console.error('Missing GITHUB_TOKEN or GITHUB_OWNER or GITHUB_REPO');
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

  try {
    console.log('Fetching partners for backup...');
    const { data: partners, error: selErr } = await supabase.from('partners').select('*');
    if (selErr) throw selErr;

    const ts = new Date().toISOString().replace(/[:.]/g,'-');
    const backupDir = path.join(process.cwd(), 'tmp');
    fs.mkdirSync(backupDir, { recursive: true });
    const backupFile = path.join(backupDir, `partners_backup_${ts}.json`);
    fs.writeFileSync(backupFile, JSON.stringify(partners || [], null, 2));
    console.log(`Backup written to ${backupFile} (rows: ${partners?.length ?? 0})`);

    if (!ARGS.yes) {
      const answer = await ask('Proceed to delete ALL partners and dispatch workflow? (type YES to confirm): ');
      if (answer.trim() !== 'YES') {
        console.log('Aborted by user. No changes made.');
        process.exit(0);
      }
    }

    console.log('Deleting all partners...');
    const { error: delErr } = await supabase.from('partners').delete().neq('id', '');
    if (delErr) throw delErr;

    // verify zero rows
    const { data: afterDelete, error: afterErr } = await supabase.from('partners').select('id').limit(1);
    if (afterErr) throw afterErr;
    console.log(`Partners remaining: ${afterDelete?.length ?? 0} (expected 0)`);

    // Dispatch workflow
    console.log(`Dispatching workflow ${ARGS.workflow} on ref ${ARGS.ref}...`);
    const dispatchUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/actions/workflows/${encodeURIComponent(ARGS.workflow)}/dispatches`;
    const res = await fetch(dispatchUrl, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${GITHUB_TOKEN}`,
        'accept': 'application/vnd.github+json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({ ref: ARGS.ref })
    });
    if (res.status !== 204) {
      const text = await res.text();
      throw new Error(`Workflow dispatch failed: ${res.status} ${text}`);
    }

    console.log('Dispatch request accepted. Workflow run will start shortly.');

    // try to retrieve the latest run for that workflow to give URL (may not appear immediately)
    const runsUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/actions/workflows/${encodeURIComponent(ARGS.workflow)}/runs?branch=${encodeURIComponent(ARGS.ref)}&event=workflow_dispatch&per_page=1`;
    await new Promise(r => setTimeout(r, 3000)); // short wait
    const runsRes = await fetch(runsUrl, { headers: { 'authorization': `Bearer ${GITHUB_TOKEN}`, 'accept': 'application/vnd.github+json' } });
    if (!runsRes.ok) {
      console.warn('Could not fetch workflow runs. Check GitHub Actions UI.');
      process.exit(0);
    }
    const runsJson = await runsRes.json();
    const run = runsJson.workflow_runs?.[0];
    if (run) {
      console.log('Workflow run:', run.html_url);
    } else {
      console.log('No run found yet; check the Actions UI for the dispatched workflow.');
    }

    console.log('\nDone. To restore partners run scripts/restore_partners.js <backup-file>');
    console.log(`Backup file: ${backupFile}`);
  } catch (err) {
    console.error('Error during operation:', err);
    process.exit(2);
  }
}

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const isMain = process.argv[1] === __filename;
if (isMain) await main();
