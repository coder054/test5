/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/react',
  '@fullcalendar/daygrid',
  '@fullcalendar/list',
  '@fullcalendar/timegrid',
  '@fullcalendar/timeline',
])

module.exports = withTM({
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    return config
  },
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/welcome',
        permanent: true,
      },
    ]
  },
})
