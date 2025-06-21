<template>
  <div class="flex items-center justify-center py-12">
    <div class="text-center">
      <div 
        class="animate-spin rounded-full border-b-2 mx-auto mb-4"
        :class="[sizeClasses, colorClasses]"
      ></div>
      <p v-if="message" class="text-gray-600 dark:text-gray-400">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  message: {
    type: String,
    default: 'Loading...'
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  color: {
    type: String,
    default: 'blue'
  }
})

const sizeClasses = computed(() => {
  const sizes = {
    small: 'h-8 w-8',
    medium: 'h-12 w-12',
    large: 'h-16 w-16'
  }
  return sizes[props.size]
})

const colorClasses = computed(() => {
  return `border-${props.color}-600`
})
</script>