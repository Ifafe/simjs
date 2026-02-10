/**
 * supabaseClient.mjs
 * ES module that creates and exports a Supabase client using environment
 * variables injected at runtime: window.__env.SUPABASE_URL and window.__env.SUPABASE_ANON_KEY
 *
 * Note: In a production setup inject the two variables server-side into a small
 * <script> that sets window.__env before other scripts run. Example (in HTML):
 * <script>window.__env = { SUPABASE_URL: 'https://...', SUPABASE_ANON_KEY: 'pk...' };</script>
 *
 * This file imports the official @supabase/supabase-js ESM build from CDN so no bundler
 * is required. It throws loudly if env vars are missing.
 */

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

function getSupabaseEnv() {
  // Prefer explicit window injection (safe for static deployments)
  if (typeof window !== 'undefined' && window.__env && window.__env.SUPABASE_URL && window.__env.SUPABASE_ANON_KEY) {
    return {
      url: window.__env.SUPABASE_URL,
      key: window.__env.SUPABASE_ANON_KEY
    };
  }

  // If running under a bundler, process.env may be available
  if (typeof process !== 'undefined' && process.env && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    return {
      url: process.env.SUPABASE_URL,
      key: process.env.SUPABASE_ANON_KEY
    };
  }

  throw new Error('Missing Supabase environment variables. Set window.__env.SUPABASE_URL and window.__env.SUPABASE_ANON_KEY.');
}

const { url: SUPABASE_URL, key: SUPABASE_ANON_KEY } = getSupabaseEnv();

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  },
  global: {
    headers: {
      'x-source': 'simjs-web'
    }
  }
});

/**
 * Fetch profile for current authenticated user (returns null if not signed in or not found)
 */
export async function getProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
  if (error) {
    console.error('getProfile error', error);
    return null;
  }
  return data;
}

/**
 * Helper that returns current user id or null
 */
export async function getCurrentUserId() {
  const { data: { user } } = await supabase.auth.getUser();
  return user?.id ?? null;
}

/**
 * Helper to get a signed public URL for a storage object (creates signed URL that expires)
 */
export async function getPublicUrlFor(bucket, path) {
  // If your bucket is public you can use getPublicUrl. For private buckets createSignedUrl.
  try {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data?.publicUrl ?? null;
  } catch (err) {
    console.error('getPublicUrlFor error', err);
    return null;
  }
}
