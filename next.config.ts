import type { NextConfig } from 'next'

/**
 * cms.aksharaya.org currently has an EXPIRED TLS certificate.
 *
 * `instrumentation.ts` sets NODE_TLS_REJECT_UNAUTHORIZED=0 at server runtime,
 * but it does NOT run during `next build` — so build-time data fetching
 * (generateStaticParams + static/ISR prerendering) fails with CERT_HAS_EXPIRED,
 * leaving event detail pages ungenerated and the gallery empty.
 *
 * next.config.ts is evaluated at the very start of BOTH build and runtime,
 * so setting it here makes server-side fetches accept the expired cert in
 * every phase. ⚠️ Remove this once the CMS certificate is renewed.
 */
if (process.env.NODE_TLS_REJECT_UNAUTHORIZED === undefined) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'aksharaya.org',
      },
      {
        protocol: 'https',
        hostname: 'cms.aksharaya.org',
      },
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
      },
    ],
  },
}

export default nextConfig
