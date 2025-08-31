/**
 * Performance configuration for monitoring and optimization
 */

module.exports = {
  // Core Web Vitals thresholds
  thresholds: {
    // Largest Contentful Paint (LCP) - should be under 2.5s
    lcp: 2500,
    // First Input Delay (FID) - should be under 100ms
    fid: 100,
    // Cumulative Layout Shift (CLS) - should be under 0.1
    cls: 0.1,
    // First Contentful Paint (FCP) - should be under 1.8s
    fcp: 1800,
    // Time to Interactive (TTI) - should be under 3.8s
    tti: 3800,
  },

  // Bundle size limits (in KB)
  bundleSize: {
    // Main bundle should be under 250KB
    main: 250,
    // Individual chunks should be under 100KB
    chunk: 100,
    // CSS should be under 50KB
    css: 50,
  },

  // Image optimization settings
  images: {
    // Maximum file size in MB
    maxSize: 5,
    // Supported formats
    formats: ['jpeg', 'jpg', 'png', 'webp', 'avif'],
    // Quality settings
    quality: {
      jpeg: 85,
      webp: 85,
      avif: 80,
    },
    // Responsive breakpoints
    breakpoints: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },

  // Caching strategies
  cache: {
    // Static assets cache duration (1 year)
    staticAssets: 31536000,
    // API responses cache duration (1 minute)
    apiResponses: 60,
    // Image cache duration (30 days)
    images: 2592000,
    // HTML cache duration (no cache)
    html: 0,
  },

  // Database optimization
  database: {
    // Connection pool settings
    pool: {
      min: 2,
      max: 10,
      idle: 30000,
      acquire: 60000,
    },
    // Query timeout in milliseconds
    queryTimeout: 10000,
    // Enable query logging in development
    logging: process.env.NODE_ENV === 'development',
  },

  // Monitoring settings
  monitoring: {
    // Enable performance monitoring
    enabled: true,
    // Sample rate (0.1 = 10% of requests)
    sampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    // Memory usage alert threshold (MB)
    memoryThreshold: 100,
    // Long task threshold (ms)
    longTaskThreshold: 50,
  },

  // Security headers
  security: {
    contentSecurityPolicy: {
      'default-src': ["'self'"],
      'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      'style-src': ["'self'", "'unsafe-inline'"],
      'img-src': ["'self'", 'data:', 'blob:'],
      'font-src': ["'self'"],
      'connect-src': ["'self'"],
      'media-src': ["'self'"],
      'object-src': ["'none'"],
      'child-src': ["'self'"],
      'worker-src': ["'self'"],
      'frame-ancestors': ["'none'"],
      'form-action': ["'self'"],
      'base-uri': ["'self'"],
      'manifest-src': ["'self'"],
    },
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    },
  },
}