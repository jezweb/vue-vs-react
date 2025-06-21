<template>
  <div v-if="hasError" class="error-boundary">
    <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 m-4">
      <h2 class="text-xl font-semibold text-red-800 dark:text-red-300 mb-2">
        Oops! Something went wrong
      </h2>
      <p class="text-red-700 dark:text-red-400 mb-4">
        {{ errorMessage || 'An unexpected error occurred. Please try refreshing the page.' }}
      </p>
      <button
        @click="reset"
        class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
  <slot v-else />
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue'

const hasError = ref(false)
const errorMessage = ref('')

onErrorCaptured((err) => {
  hasError.value = true
  errorMessage.value = err.message || 'An unexpected error occurred'
  
  // Log error in development
  if (import.meta.env.DEV) {
    console.error('Error caught by boundary:', err)
  }
  
  // Prevent error propagation
  return false
})

const reset = () => {
  hasError.value = false
  errorMessage.value = ''
}
</script>

<style scoped>
.error-boundary {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>