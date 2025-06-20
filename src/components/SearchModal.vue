<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" @click.self="close">
        <div class="flex items-start justify-center min-h-screen pt-24 px-4">
          <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="close"></div>
          
          <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl">
            <!-- Search Input -->
            <div class="flex items-center border-b border-gray-200 dark:border-gray-700 px-4">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input
                ref="searchInput"
                v-model="searchQuery"
                type="text"
                placeholder="Search React vs Vue features, concepts, code examples..."
                class="w-full px-4 py-4 bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:outline-none"
                @keydown.escape="close"
                @keydown.enter="selectResult(filteredResults[selectedIndex])"
                @keydown.up.prevent="navigateUp"
                @keydown.down.prevent="navigateDown"
              >
              <kbd class="hidden sm:inline-block px-2 py-1 text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 rounded">ESC</kbd>
            </div>
            
            <!-- Search Results -->
            <div class="max-h-96 overflow-y-auto">
              <div v-if="searchQuery && filteredResults.length === 0" class="p-8 text-center text-gray-500">
                No results found for "{{ searchQuery }}"
              </div>
              
              <div v-else-if="searchQuery">
                <div
                  v-for="(result, index) in filteredResults"
                  :key="result.id"
                  @click="selectResult(result)"
                  @mouseenter="selectedIndex = index"
                  :class="[
                    'px-4 py-3 cursor-pointer transition-colors',
                    selectedIndex === index
                      ? 'bg-blue-50 dark:bg-gray-700'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  ]"
                >
                  <div class="flex items-start">
                    <span class="flex-shrink-0 mr-3 mt-0.5">
                      {{ result.icon }}
                    </span>
                    <div class="flex-1 min-w-0">
                      <h3 class="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {{ result.title }}
                      </h3>
                      <p class="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                        {{ result.description }}
                      </p>
                      <div class="flex items-center mt-1 space-x-4 text-xs">
                        <span :class="[
                          'font-medium',
                          result.framework === 'react' ? 'text-react-blue' : 
                          result.framework === 'vue' ? 'text-vue-green' : 
                          'text-gray-500'
                        ]">
                          {{ result.framework === 'both' ? 'React & Vue' : result.framework }}
                        </span>
                        <span class="text-gray-500">{{ result.category }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Quick Links (shown when no search) -->
              <div v-else class="p-4">
                <div class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Quick Links
                </div>
                <div class="space-y-1">
                  <router-link
                    v-for="link in quickLinks"
                    :key="link.path"
                    :to="link.path"
                    @click="close"
                    class="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span class="text-gray-700 dark:text-gray-300">{{ link.name }}</span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close'])

const router = useRouter()
const searchInput = ref(null)
const searchQuery = ref('')
const selectedIndex = ref(0)

// Search data
const searchableContent = [
  // Core Concepts
  {
    id: 'concept-components',
    title: 'Components',
    description: 'Building blocks of modern web applications',
    framework: 'both',
    category: 'Core Concepts',
    icon: '🧩',
    path: '/compare#components'
  },
  {
    id: 'concept-reactivity',
    title: 'Reactivity System',
    description: 'How Vue automatically tracks and updates the UI',
    framework: 'vue',
    category: 'Core Concepts',
    icon: '⚡',
    path: '/compare#reactivity'
  },
  {
    id: 'concept-hooks',
    title: 'React Hooks',
    description: 'useState, useEffect, and custom hooks',
    framework: 'react',
    category: 'Core Concepts',
    icon: '🎣',
    path: '/compare#state-management'
  },
  {
    id: 'concept-composition-api',
    title: 'Composition API',
    description: 'Vue 3\'s powerful logic composition system',
    framework: 'vue',
    category: 'Core Concepts',
    icon: '🎼',
    path: '/compare#composition-api'
  },
  
  // Features
  {
    id: 'feature-jsx',
    title: 'JSX Syntax',
    description: 'JavaScript XML for writing UI components',
    framework: 'react',
    category: 'Features',
    icon: '📝',
    path: '/compare#syntax'
  },
  {
    id: 'feature-templates',
    title: 'Template Syntax',
    description: 'HTML-based templates with directives',
    framework: 'vue',
    category: 'Features',
    icon: '📄',
    path: '/compare#syntax'
  },
  {
    id: 'feature-performance',
    title: 'Performance Optimization',
    description: 'Virtual DOM, memoization, and lazy loading',
    framework: 'both',
    category: 'Features',
    icon: '🚀',
    path: '/compare#performance'
  },
  
  // Tools
  {
    id: 'tool-playground',
    title: 'Code Playground',
    description: 'Try React and Vue code side by side',
    framework: 'both',
    category: 'Tools',
    icon: '🎮',
    path: '/playground'
  },
  {
    id: 'tool-decision',
    title: 'Decision Helper',
    description: 'Find the right framework for your project',
    framework: 'both',
    category: 'Tools',
    icon: '🤔',
    path: '/decision-helper'
  },
  {
    id: 'tool-learn',
    title: 'Interactive Tutorials',
    description: 'Learn React and Vue with hands-on examples',
    framework: 'both',
    category: 'Learning',
    icon: '📚',
    path: '/learn'
  },
  
  // Ecosystem
  {
    id: 'eco-routing',
    title: 'Routing',
    description: 'React Router vs Vue Router',
    framework: 'both',
    category: 'Ecosystem',
    icon: '🛤️',
    path: '/compare#routing'
  },
  {
    id: 'eco-state',
    title: 'State Management',
    description: 'Redux/Zustand vs Pinia/Vuex',
    framework: 'both',
    category: 'Ecosystem',
    icon: '📦',
    path: '/compare#state-management'
  },
  {
    id: 'eco-mobile',
    title: 'Mobile Development',
    description: 'React Native for building mobile apps',
    framework: 'react',
    category: 'Ecosystem',
    icon: '📱',
    path: '/compare#mobile'
  },
  {
    id: 'eco-ssr',
    title: 'Server-Side Rendering',
    description: 'Next.js vs Nuxt.js',
    framework: 'both',
    category: 'Ecosystem',
    icon: '🖥️',
    path: '/compare#ssr'
  }
]

const quickLinks = [
  { name: 'Compare Frameworks', path: '/compare' },
  { name: 'Try Playground', path: '/playground' },
  { name: 'Interactive Learn', path: '/learn' },
  { name: 'Decision Helper', path: '/decision-helper' }
]

// Computed
const filteredResults = computed(() => {
  if (!searchQuery.value) return []
  
  const query = searchQuery.value.toLowerCase()
  return searchableContent
    .filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.framework.toLowerCase().includes(query)
    )
    .slice(0, 8) // Limit results
})

// Methods
const close = () => {
  emit('close')
  searchQuery.value = ''
  selectedIndex.value = 0
}

const selectResult = (result) => {
  if (result) {
    router.push(result.path)
    close()
  }
}

const navigateUp = () => {
  if (selectedIndex.value > 0) {
    selectedIndex.value--
  }
}

const navigateDown = () => {
  if (selectedIndex.value < filteredResults.value.length - 1) {
    selectedIndex.value++
  }
}

// Watch for modal open
watch(() => props.isOpen, async (newVal) => {
  if (newVal) {
    await nextTick()
    searchInput.value?.focus()
  }
})

// Reset selected index when results change
watch(filteredResults, () => {
  selectedIndex.value = 0
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from > div > div,
.modal-leave-to > div > div {
  transform: scale(0.95);
}
</style>