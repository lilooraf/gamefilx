/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'img.opencritic.com',
            port: '',
            pathname: '/game/**',
          },
          
        ],
      },
}

module.exports = nextConfig
