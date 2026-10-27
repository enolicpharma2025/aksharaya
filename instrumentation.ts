/**
 * Next.js Instrumentation — runs once at server startup (before any requests).
 *
 * cms.aksharaya.org has an expired TLS certificate.  Setting
 * NODE_TLS_REJECT_UNAUTHORIZED=0 here lets Node's https module (and the
 * built-in fetch that Next.js uses for server-side data fetching) accept the
 * certificate and return real data instead of an empty array.
 *
 * ⚠️  This must be removed / replaced once the CMS SSL certificate is renewed.
 */
export function register() {
  if (process.env.NODE_TLS_REJECT_UNAUTHORIZED === undefined) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  }
}
