/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,
  
  // Configure image domains for Next.js Image component
  images: {
    domains: [
      'via.placeholder.com',
      'images.unsplash.com',
      'source.unsplash.com',
      'www.motortrend.com',
      'www.caranddriver.com',
      'www.edmunds.com',
      'www.autotempest.com',
      // Add your CDN domain here
    ],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Environment variables available to the browser
  env: {
    NEXT_PUBLIC_APP_NAME: 'Brake Bias',
    NEXT_PUBLIC_APP_VERSION: '1.0.0',
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  },
  
  // Redirect root to home
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
  
  // Custom headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  },
  
  // Webpack configuration for custom imports
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add custom webpack configurations here if needed
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': './components',
      '@lib': './lib',
      '@styles': './styles',
      '@utils': './utils',
    }
    
    return config
  },
  
  // Experimental features
  experimental: {
    // Server Actions are now stable in Next.js 14
  },
  
  // Custom build directory (if needed)
  // distDir: 'build',
  
  // Configure trailing slashes
  trailingSlash: false,
  
  // PoweredByHeader
  poweredByHeader: false,
  
  // Compression
  compress: true,
  
  // Generate ETags
  generateEtags: true,
  
  // Page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  
  // Custom server configuration (if needed)
  // serverRuntimeConfig: {
  //   // Will only be available on the server side
  //   mySecret: 'secret',
  // },
  
  // Public runtime configuration
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/public',
  },
}

module.exports = nextConfig