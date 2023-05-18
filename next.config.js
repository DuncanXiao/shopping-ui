const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // exportPathMap: async function (
  //   defaultPathMap,
  //   { dev, dir, outDir, distDir, buildId }
  // ) {
  //   return {
  //     '/': { page: '/index' },
  //     '/pd/:slug': { page: '/product/detail'}
  //   }
  // },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    return config
  }
}

module.exports = nextConfig
