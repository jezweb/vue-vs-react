<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <div class="h-full flex flex-col">
      <!-- Header -->
      <div class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-4">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-200">Code Playground</h1>
          <div class="flex gap-2">
            <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Run Code
            </button>
            <button class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors">
              Share
            </button>
          </div>
        </div>
      </div>
      
      <!-- Playground Content -->
      <div class="flex-1 flex">
        <!-- React Editor -->
        <div class="flex-1 flex flex-col border-r border-gray-300 dark:border-gray-700">
          <div class="bg-react-dark text-white p-3 font-semibold flex items-center">
            <span class="text-react-blue mr-2">⚛</span> React
          </div>
          <div class="flex-1 bg-gray-900 p-4">
            <pre class="text-gray-300 font-mono text-sm">// React code editor will be here
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    &lt;div>
      &lt;h1>Count: {count}&lt;/h1>
      &lt;button onClick={() => setCount(count + 1)}>
        Increment
      &lt;/button>
    &lt;/div>
  );
}

export default Counter;</pre>
          </div>
        </div>
        
        <!-- Vue Editor -->
        <div class="flex-1 flex flex-col">
          <div class="bg-vue-dark text-white p-3 font-semibold flex items-center">
            <span class="text-vue-green mr-2">▲</span> Vue
          </div>
          <div class="flex-1 bg-gray-900 p-4">
            <pre class="text-gray-300 font-mono text-sm">// Vue code editor will be here
&lt;template>
  &lt;div>
    &lt;h1>Count: {{ count }}&lt;/h1>
    &lt;button @click="count++">
      Increment
    &lt;/button>
  &lt;/div>
&lt;/template>

&lt;script setup>
import { ref } from 'vue'

const count = ref(0)
&lt;/script></pre>
          </div>
        </div>
      </div>
      
      <!-- Output Preview -->
      <div class="h-64 bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700">
        <div class="p-3 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300">
          Output Preview
        </div>
        <div class="p-4">
          <p class="text-gray-500 dark:text-gray-400">Code output will appear here...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Playground component - Monaco editor will be integrated later
</script>