import createNextIntlPlugin from 'next-intl/plugin'

// const withNextIntl = createNextIntlPlugin(
//   './i18n/request.js'
// );

const withNextIntl = createNextIntlPlugin()
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    // if (!options.isServer) {
    //   if (options.dev) {
    //     config.devtool = 'cheap-module-source-map' 
    //   } else {
    //     config.devtool = 'hidden-source-map'
    //   }
    // }

    return config
  },
  reactStrictMode: false,
};
 
export default withNextIntl(nextConfig);