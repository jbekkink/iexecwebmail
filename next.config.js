/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async headers() {
    return [
        {
            source: '/(.*)?', // Matches all pages
            headers: [
                {
                    key: 'X-Frame-Options',
                    value: 'allow',
                }
            ]
        }
    ]
  }
}

module.exports = nextConfig
