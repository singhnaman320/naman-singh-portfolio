// Application Configuration
const config = {
  // API Configuration
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  },

  // App Configuration
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Naman Portfolio',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    environment: import.meta.env.MODE || 'development',
  },

  // Feature Flags
  features: {
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    enableServiceWorker: import.meta.env.VITE_ENABLE_SERVICE_WORKER === 'true',
    enableDebug: import.meta.env.VITE_ENABLE_DEBUG === 'true' || import.meta.env.MODE === 'development',
  },

  // External Services
  services: {
    googleAnalyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
    sentryDsn: import.meta.env.VITE_SENTRY_DSN,
  },

  // Development Settings
  dev: {
    enableMockData: import.meta.env.VITE_ENABLE_MOCK_DATA === 'true',
    showDevTools: import.meta.env.VITE_SHOW_DEV_TOOLS === 'true',
  }
}

export default config
