import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const sassOptions = {
  additionalData: `
    $dirty-grey: rgb(250, 250, 250, 0.8);
    $lite-gray: #F1F4F6;
    $blue-primary: #2A7FFF;
    $grey: #909090;
    $black: #000000;
  `,
}

const nextConfig: NextConfig = {
  sassOptions: sassOptions,
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
}

const withNextIntl = createNextIntlPlugin(
  './src/shared/config/request-i18n-config.ts',
)
export default withNextIntl(nextConfig)
