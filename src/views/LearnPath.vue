<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
        Interactive Learning Path
      </h1>
      
      <div class="grid md:grid-cols-2 gap-8">
        <!-- React Path -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-bold mb-6 text-react-blue">Learn React</h2>
          <div class="space-y-4">
            <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <h3 class="font-semibold">1. Hello World</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Your first React component</p>
            </div>
            <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <h3 class="font-semibold">2. State & Props</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Managing data in React</p>
            </div>
            <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <h3 class="font-semibold">3. Hooks</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Modern React patterns</p>
            </div>
          </div>
        </div>
        
        <!-- Vue Path -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-bold mb-6 text-vue-green">Learn Vue</h2>
          <div class="space-y-4">
            <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <h3 class="font-semibold">1. Hello World</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Your first Vue component</p>
            </div>
            <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <h3 class="font-semibold">2. Reactivity</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Vue's reactive system</p>
            </div>
            <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <h3 class="font-semibold">3. Composition API</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Modern Vue patterns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Learning path component
</script>