import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: false,
            },
          },
        ],
        as: '*.js',
      },
    },
  },
}

const withNextIntl = createNextIntlPlugin('./src/shared/lib/i18n/request.ts')
export default withNextIntl(nextConfig)
