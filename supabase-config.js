/* Public Supabase web client configuration. Use only your publishable key (sb_publishable_...).
   NEVER put your secret / service_role key or your database password in these files. */
window.ACCESSABLE_SUPABASE_CONFIG = {
  url: 'https://rkxzrnsqvfgyksmzyvbr.supabase.com',
  publishableKey: 'sb_publishable_6FpstNC8lR2RCorxnwSGDw_fqjkf9bN'
};
window.ACCESSABLE_HAS_SUPABASE = /^https:\/\//.test(window.ACCESSABLE_SUPABASE_CONFIG.url) &&
  !window.ACCESSABLE_SUPABASE_CONFIG.url.includes('REPLACE_WITH') &&
  window.ACCESSABLE_SUPABASE_CONFIG.publishableKey.startsWith('sb_publishable_');
