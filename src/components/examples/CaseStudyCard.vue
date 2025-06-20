<template>
  <div class="case-study-card">
    <div class="card-header" @click="toggleExpanded">
      <div class="company-info">
        <span class="company-logo">{{ company.logo }}</span>
        <div>
          <h3 class="company-name">{{ company.name }}</h3>
          <p class="company-description">{{ company.description }}</p>
        </div>
      </div>
      <button class="expand-button" :class="{ rotated: isExpanded }">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
    </div>

    <Transition name="expand">
      <div v-if="isExpanded" class="card-content">
        <!-- Usage Scale -->
        <div class="content-section">
          <h4 class="section-title">Scale & Products</h4>
          <div class="scale-info">
            <span class="scale-badge">{{ company.usage.scale }}</span>
          </div>
          <div class="products-grid">
            <span v-for="product in company.usage.products" :key="product" class="product-tag">
              {{ product }}
            </span>
          </div>
        </div>

        <!-- Why They Chose -->
        <div class="content-section">
          <h4 class="section-title">Why {{ framework }}?</h4>
          <p class="why-text">{{ company.whyReact || company.whyVue }}</p>
        </div>

        <!-- Key Benefits -->
        <div class="content-section">
          <h4 class="section-title">Key Benefits</h4>
          <ul class="benefits-list">
            <li v-for="benefit in company.benefits" :key="benefit">
              {{ benefit }}
            </li>
          </ul>
        </div>

        <!-- Tech Stack -->
        <div class="content-section">
          <h4 class="section-title">Tech Stack</h4>
          <div class="tech-stack">
            <span v-for="tech in company.techStack" :key="tech" class="tech-badge">
              {{ tech }}
            </span>
          </div>
        </div>

        <!-- Quote -->
        <div class="quote-section">
          <blockquote class="company-quote">
            "{{ company.quote }}"
          </blockquote>
        </div>

        <!-- Metrics -->
        <div class="content-section">
          <h4 class="section-title">Impact Metrics</h4>
          <div class="metrics-grid">
            <div v-for="(value, key) in company.metrics" :key="key" class="metric-item">
              <div class="metric-value">{{ value }}</div>
              <div class="metric-label">{{ formatMetricLabel(key) }}</div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  company: {
    type: Object,
    required: true
  },
  framework: {
    type: String,
    required: true
  }
})

const isExpanded = ref(false)

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

const formatMetricLabel = (key) => {
  const labels = {
    performanceGain: 'Performance',
    developerProductivity: 'Developer Productivity',
    codeReuse: 'Code Reuse',
    startupTime: 'Startup Time',
    engagement: 'User Engagement',
    bundleSize: 'Bundle Size',
    pageSpeed: 'Page Speed',
    conversionRate: 'Conversion Rate',
    developmentSpeed: 'Development Speed',
    loadTime: 'Load Time',
    realtimeLatency: 'Real-time Latency',
    codeSharing: 'Code Sharing',
    checkoutCompletion: 'Checkout Completion',
    pageErrors: 'Page Errors',
    timeToMarket: 'Time to Market',
    messageLatency: 'Message Latency',
    memoryUsage: 'Memory Usage',
    featureVelocity: 'Feature Velocity',
    migrationTime: 'Migration Time',
    userSatisfaction: 'User Satisfaction',
    responseTime: 'Response Time',
    extensionSize: 'Extension Size',
    userEngagement: 'User Engagement',
    configuratorCompletion: 'Configurator Completion',
    mobileUsage: 'Mobile Usage',
    developmentTime: 'Development Time',
    maintenance: 'Maintenance',
    timeToMarket: 'Time to Market',
    codeReusability: 'Code Reusability',
    developerSatisfaction: 'Developer Satisfaction',
    developerAdoption: 'Developer Adoption',
    projectSpeed: 'Project Speed',
    communityGrowth: 'Community Growth'
  }
  return labels[key] || key
}
</script>

<style scoped>
.case-study-card {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300;
}

.card-header {
  @apply p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors;
  @apply flex items-center justify-between;
}

.company-info {
  @apply flex items-center space-x-4;
}

.company-logo {
  @apply text-4xl;
}

.company-name {
  @apply text-xl font-bold text-gray-800 dark:text-gray-200;
}

.company-description {
  @apply text-sm text-gray-600 dark:text-gray-400 mt-1;
}

.expand-button {
  @apply p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all;
}

.expand-button.rotated {
  @apply transform rotate-180;
}

.card-content {
  @apply p-6 pt-0 space-y-6;
}

.content-section {
  @apply space-y-3;
}

.section-title {
  @apply text-lg font-semibold text-gray-800 dark:text-gray-200;
}

.scale-info {
  @apply mb-3;
}

.scale-badge {
  @apply inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium;
}

.products-grid {
  @apply flex flex-wrap gap-2;
}

.product-tag {
  @apply px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm;
}

.why-text {
  @apply text-gray-700 dark:text-gray-300;
}

.benefits-list {
  @apply space-y-2;
}

.benefits-list li {
  @apply flex items-start text-gray-700 dark:text-gray-300;
}

.benefits-list li::before {
  content: "✓";
  @apply text-green-500 mr-2 flex-shrink-0;
}

.tech-stack {
  @apply flex flex-wrap gap-2;
}

.tech-badge {
  @apply px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded text-sm font-medium;
}

.quote-section {
  @apply bg-gray-50 dark:bg-gray-900 p-4 rounded-lg;
}

.company-quote {
  @apply text-gray-700 dark:text-gray-300 italic text-lg;
}

.metrics-grid {
  @apply grid grid-cols-2 md:grid-cols-3 gap-4;
}

.metric-item {
  @apply text-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg;
}

.metric-value {
  @apply text-2xl font-bold text-gray-800 dark:text-gray-200;
}

.metric-label {
  @apply text-sm text-gray-600 dark:text-gray-400 mt-1;
}

/* Transition styles */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 1000px;
}
</style>