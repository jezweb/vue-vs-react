<template>
  <div class="benchmark-chart">
    <h3 class="chart-title">{{ title }}</h3>
    <div class="chart-container">
      <div class="bars-container">
        <div v-for="(metric, index) in metrics" :key="index" class="metric-row">
          <div class="metric-label">{{ metric.label }}</div>
          <div class="bars-wrapper">
            <div class="bar-group">
              <div class="bar-container react-bar">
                <div 
                  class="bar"
                  :style="{ width: getBarWidth(metric.react, metric.type) }"
                >
                  <span class="bar-value">{{ formatValue(metric.react, metric.type) }}</span>
                </div>
              </div>
              <div class="bar-container vue-bar">
                <div 
                  class="bar"
                  :style="{ width: getBarWidth(metric.vue, metric.type) }"
                >
                  <span class="bar-value">{{ formatValue(metric.vue, metric.type) }}</span>
                </div>
              </div>
            </div>
            <div class="winner-indicator" v-if="showWinner">
              <span v-if="getWinner(metric)" :class="getWinnerClass(metric)">
                {{ getWinner(metric) === 'react' ? '⚛' : '▲' }}
                {{ getWinnerMargin(metric) }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="legend">
        <div class="legend-item">
          <span class="legend-color react-color"></span>
          <span>React</span>
        </div>
        <div class="legend-item">
          <span class="legend-color vue-color"></span>
          <span>Vue</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  metrics: {
    type: Array,
    required: true
    // Expected format:
    // [
    //   { label: 'Bundle Size', react: 142, vue: 134, type: 'size', unit: 'KB' },
    //   { label: 'Time to Interactive', react: 1.2, vue: 1.1, type: 'time', unit: 's' }
    // ]
  },
  showWinner: {
    type: Boolean,
    default: true
  }
})

const getBarWidth = (value, type) => {
  // Find max value for this type across all metrics
  const maxValue = Math.max(
    ...props.metrics
      .filter(m => m.type === type)
      .flatMap(m => [parseFloat(m.react), parseFloat(m.vue)])
  )
  
  const percentage = (parseFloat(value) / maxValue) * 100
  return `${percentage}%`
}

const formatValue = (value, type) => {
  const numValue = parseFloat(value)
  if (type === 'size') {
    return `${numValue}KB`
  } else if (type === 'time') {
    return `${numValue}s`
  } else if (type === 'percentage') {
    return `${numValue}%`
  } else if (type === 'score') {
    return numValue.toString()
  }
  return value.toString()
}

const getWinner = (metric) => {
  const reactValue = parseFloat(metric.react)
  const vueValue = parseFloat(metric.vue)
  
  // Lower is better for most metrics (size, time)
  // Higher is better for scores
  if (metric.type === 'score') {
    return reactValue > vueValue ? 'react' : 'vue'
  }
  
  return reactValue < vueValue ? 'react' : 'vue'
}

const getWinnerClass = (metric) => {
  const winner = getWinner(metric)
  return winner === 'react' ? 'winner-react' : 'winner-vue'
}

const getWinnerMargin = (metric) => {
  const reactValue = parseFloat(metric.react)
  const vueValue = parseFloat(metric.vue)
  
  let percentage
  if (metric.type === 'score') {
    percentage = Math.abs(((reactValue - vueValue) / Math.min(reactValue, vueValue)) * 100)
  } else {
    percentage = Math.abs(((reactValue - vueValue) / Math.max(reactValue, vueValue)) * 100)
  }
  
  return `+${percentage.toFixed(0)}%`
}
</script>

<style scoped>
.benchmark-chart {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow p-6;
}

.chart-title {
  @apply text-xl font-bold text-gray-800 dark:text-gray-200 mb-6;
}

.chart-container {
  @apply space-y-6;
}

.bars-container {
  @apply space-y-6;
}

.metric-row {
  @apply space-y-2;
}

.metric-label {
  @apply text-sm font-medium text-gray-700 dark:text-gray-300;
}

.bars-wrapper {
  @apply flex items-center gap-4;
}

.bar-group {
  @apply flex-1 space-y-2;
}

.bar-container {
  @apply relative h-8 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden;
}

.bar {
  @apply h-full flex items-center px-2 transition-all duration-500 ease-out;
}

.react-bar .bar {
  @apply bg-react-blue;
}

.vue-bar .bar {
  @apply bg-vue-green;
}

.bar-value {
  @apply text-xs font-semibold text-white;
}

.winner-indicator {
  @apply flex items-center;
}

.winner-indicator span {
  @apply text-sm font-semibold px-2 py-1 rounded;
}

.winner-react {
  @apply text-react-blue bg-blue-50;
}

.winner-vue {
  @apply text-vue-green bg-green-50;
}

.legend {
  @apply flex items-center justify-center gap-6 pt-4 border-t border-gray-200 dark:border-gray-700;
}

.legend-item {
  @apply flex items-center gap-2;
}

.legend-color {
  @apply w-4 h-4 rounded;
}

.react-color {
  @apply bg-react-blue;
}

.vue-color {
  @apply bg-vue-green;
}
</style>