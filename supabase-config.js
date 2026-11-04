/* Public Supabase web client configuration. Use only your publishable key (sb_publishable_...).
   NEVER put your secret / service_role key or your database password in these files. */
window.ACCESSABLE_SUPABASE_CONFIG = {
  url: 'REPLACE_WITH_YOUR_SUPABASE_PROJECT_URL',
  publishableKey: 'REPLACE_WITH_YOUR_SUPABASE_PUBLISHABLE_KEY'
};
window.ACCESSABLE_HAS_SUPABASE = /^https:\/\//.test(window.ACCESSABLE_SUPABASE_CONFIG.url) &&
  !window.ACCESSABLE_SUPABASE_CONFIG.url.includes('REPLACE_WITH') &&
  window.ACCESSABLE_SUPABASE_CONFIG.publishableKey.startsWith('sb_publishable_');
