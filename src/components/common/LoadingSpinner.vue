<template>
  <div class="flex items-center justify-center p-4">
    <div class="relative">
      <div class="w-12 h-12 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
      <div class="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-t-react-blue border-r-transparent border-b-vue-green border-l-transparent animate-spin"></div>
    </div>
  </div>
</template>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>