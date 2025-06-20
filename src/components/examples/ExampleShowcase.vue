<template>
  <div class="example-showcase">
    <div class="showcase-header">
      <h3 class="showcase-title">{{ example.title }}</h3>
      <p class="showcase-description">{{ example.description }}</p>
      <div class="showcase-meta">
        <span class="difficulty-badge" :class="difficultyClass">
          {{ example.difficulty }}
        </span>
        <span class="category-badge">{{ example.category }}</span>
      </div>
      <div class="concepts-list">
        <span v-for="concept in example.concepts" :key="concept" class="concept-tag">
          {{ concept }}
        </span>
      </div>
    </div>

    <!-- Code Comparison -->
    <div class="code-comparison">
      <div class="code-panel react-panel">
        <div class="panel-header react-header">
          <span class="framework-icon">⚛</span>
          <span class="framework-name">React</span>
        </div>
        <div class="code-container">
          <pre class="code-block"><code>{{ example.react.code }}</code></pre>
          <div v-if="example.react.usage" class="usage-section">
            <h4 class="usage-title">Usage Example</h4>
            <pre class="usage-code"><code>{{ example.react.usage }}</code></pre>
          </div>
        </div>
      </div>

      <div class="code-panel vue-panel">
        <div class="panel-header vue-header">
          <span class="framework-icon">▲</span>
          <span class="framework-name">Vue</span>
        </div>
        <div class="code-container">
          <pre class="code-block"><code>{{ example.vue.code }}</code></pre>
          <div v-if="example.vue.usage" class="usage-section">
            <h4 class="usage-title">Usage Example</h4>
            <pre class="usage-code"><code>{{ example.vue.usage }}</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Key Differences -->
    <div v-if="example.keyDifferences" class="differences-section">
      <h4 class="differences-title">Key Differences</h4>
      <ul class="differences-list">
        <li v-for="difference in example.keyDifferences" :key="difference">
          {{ difference }}
        </li>
      </ul>
    </div>

    <!-- Live Demo Button -->
    <div class="actions-section">
      <button @click="$emit('open-playground', example)" class="demo-button">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        Try in Playground
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  example: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['open-playground'])

const difficultyClass = computed(() => {
  const classes = {
    beginner: 'difficulty-beginner',
    intermediate: 'difficulty-intermediate',
    advanced: 'difficulty-advanced'
  }
  return classes[props.example.difficulty] || 'difficulty-intermediate'
})
</script>

<style scoped>
.example-showcase {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden;
}

.showcase-header {
  @apply p-6 border-b border-gray-200 dark:border-gray-700;
}

.showcase-title {
  @apply text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2;
}

.showcase-description {
  @apply text-gray-600 dark:text-gray-400 mb-4;
}

.showcase-meta {
  @apply flex items-center gap-3 mb-4;
}

.difficulty-badge {
  @apply px-3 py-1 rounded-full text-sm font-medium;
}

.difficulty-beginner {
  @apply bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300;
}

.difficulty-intermediate {
  @apply bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300;
}

.difficulty-advanced {
  @apply bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300;
}

.category-badge {
  @apply px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium;
}

.concepts-list {
  @apply flex flex-wrap gap-2;
}

.concept-tag {
  @apply px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs;
}

.code-comparison {
  @apply grid lg:grid-cols-2 gap-0;
}

.code-panel {
  @apply border-b lg:border-b-0 border-gray-200 dark:border-gray-700;
}

.react-panel {
  @apply lg:border-r;
}

.panel-header {
  @apply px-6 py-3 flex items-center space-x-2 font-semibold;
}

.react-header {
  @apply bg-blue-50 dark:bg-gray-700 text-react-blue;
}

.vue-header {
  @apply bg-green-50 dark:bg-gray-700 text-vue-green;
}

.framework-icon {
  @apply text-2xl;
}

.framework-name {
  @apply text-lg;
}

.code-container {
  @apply p-6 bg-gray-50 dark:bg-gray-900;
}

.code-block {
  @apply bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono;
  max-height: 400px;
  overflow-y: auto;
}

.usage-section {
  @apply mt-4;
}

.usage-title {
  @apply text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2;
}

.usage-code {
  @apply bg-gray-800 text-gray-100 p-3 rounded text-sm font-mono overflow-x-auto;
}

.differences-section {
  @apply p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700;
}

.differences-title {
  @apply text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4;
}

.differences-list {
  @apply space-y-2;
}

.differences-list li {
  @apply flex items-start text-gray-700 dark:text-gray-300;
}

.differences-list li::before {
  content: "•";
  @apply text-blue-500 mr-2 flex-shrink-0;
}

.actions-section {
  @apply p-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-center;
}

.demo-button {
  @apply flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors;
}

/* Syntax highlighting approximation */
.code-block code {
  @apply text-gray-100;
}

/* You could add more sophisticated syntax highlighting here */
</style>