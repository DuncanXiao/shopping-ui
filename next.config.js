const path = require('path')
const { i18n } = require('./next-i18next.config')
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  i18n,
  // i18n: {
  //   locales: ['en-US', 'fr-FR', 'es-ES'],
  //   defaultLocale: 'en-US',
  // },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    return config
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')],
  }
}

module.exports = nextConfig
