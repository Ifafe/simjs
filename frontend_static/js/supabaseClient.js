(function() {
  // Lightweight wrapper that dynamically imports the ESM client and attaches
  // it to window.supabaseClient so non-module scripts can use it without
  // changing existing <script> tags. Requires that the browser supports modules.
  if (window.supabaseClient) return;

  const script = document.createElement('script');
  script.type = 'module';
  script.textContent = `
    import { supabase, getProfile, getCurrentUserId, getPublicUrlFor } from './js/supabaseClient.mjs';
    window.supabaseClient = { supabase, getProfile, getCurrentUserId, getPublicUrlFor };
  `;
  document.head.appendChild(script);
})();
