/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '55521',
      },
      {
        protocol: 'https',
        hostname: 'kgskpeyfzedphcanbnjz.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'ucaeytwttilbcovyvutf.supabase.co',
      },
    ],
  },
  transpilePackages: ['react-syntax-highlighter', 'swagger-client', 'swagger-ui-react'],
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ]
  },
}

export default nextConfig
