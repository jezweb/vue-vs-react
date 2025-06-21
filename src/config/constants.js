// Framework metrics and statistics
export const FRAMEWORK_METRICS = {
  react: {
    bundleSize: '45KB',
    bundleSizeRaw: 45,
    githubStars: '225k+',
    githubStarsRaw: 225000,
    initialRenderTime: 16, // ms
    memoryUsage: 'Moderate',
    npmWeeklyDownloads: '21M+',
    firstRelease: 2013,
    currentVersion: '18.3.1'
  },
  vue: {
    bundleSize: '34KB',
    bundleSizeRaw: 34,
    githubStars: '207k+',
    githubStarsRaw: 207000,
    initialRenderTime: 13, // ms
    memoryUsage: 'Low',
    npmWeeklyDownloads: '4.5M+',
    firstRelease: 2014,
    currentVersion: '3.5.13'
  }
}

// Performance test configurations
export const PERFORMANCE_TEST_CONFIG = {
  listRenderingSize: 1000,
  rapidUpdatesPerSecond: 100,
  realDomTestSize: 5000,
  fpsTestDuration: 5000, // ms
  memoryTestIterations: 1000,
  startupTestWarmupRuns: 3,
  startupTestRuns: 10
}

// Learning path configurations
export const LEARNING_CONFIG = {
  estimatedTimePerLesson: 15, // minutes
  difficultyLevels: {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced'
  }
}

// External links
export const EXTERNAL_LINKS = {
  react: {
    official: 'https://react.dev',
    github: 'https://github.com/facebook/react',
    npm: 'https://www.npmjs.com/package/react',
    devtools: 'https://react.dev/learn/react-developer-tools'
  },
  vue: {
    official: 'https://vuejs.org',
    github: 'https://github.com/vuejs/core',
    npm: 'https://www.npmjs.com/package/vue',
    devtools: 'https://devtools.vuejs.org'
  }
}

// Animation delays (in ms)
export const ANIMATION_DELAYS = {
  heroTitle: 100,
  heroSubtitle: 200,
  heroButtons: 300,
  featureCards: {
    base: 400,
    increment: 100
  },
  comparisonTable: 600
}

// Sandbox security settings
export const SANDBOX_PERMISSIONS = [
  'allow-scripts',
  'allow-same-origin',
  'allow-forms',
  'allow-modals'
].join(' ')

// CDN URLs for playground
export const CDN_URLS = {
  react: {
    production: 'https://unpkg.com/react@18/umd/react.production.min.js',
    dom: 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
    babel: 'https://unpkg.com/@babel/standalone/babel.min.js'
  },
  vue: {
    global: 'https://unpkg.com/vue@3/dist/vue.global.js'
  }
}