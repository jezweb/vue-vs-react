<template>
  <nav class="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <span class="text-2xl font-bold">
            <span class="text-react-blue">R</span>
            <span class="text-gray-600 dark:text-gray-400">/</span>
            <span class="text-vue-green">V</span>
          </span>
          <span class="text-gray-700 dark:text-gray-300 font-medium">Compare</span>
        </router-link>
        
        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link
            to="/"
            class="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            :class="{ 'text-blue-600 dark:text-blue-400': $route.path === '/' }"
          >
            Home
            <span v-if="$route.path === '/'" class="absolute -bottom-6 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"></span>
          </router-link>
          <router-link
            to="/compare"
            class="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            :class="{ 'text-blue-600 dark:text-blue-400': $route.path === '/compare' }"
          >
            Compare
            <span v-if="$route.path === '/compare'" class="absolute -bottom-6 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"></span>
          </router-link>
          <router-link
            to="/learn"
            class="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            :class="{ 'text-blue-600 dark:text-blue-400': $route.path === '/learn' }"
          >
            Learn
            <span v-if="$route.path === '/learn'" class="absolute -bottom-6 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"></span>
          </router-link>
          <router-link
            to="/playground"
            class="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            :class="{ 'text-blue-600 dark:text-blue-400': $route.path === '/playground' }"
          >
            Playground
            <span v-if="$route.path === '/playground'" class="absolute -bottom-6 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"></span>
          </router-link>
          <router-link
            to="/performance"
            class="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            :class="{ 'text-blue-600 dark:text-blue-400': $route.path === '/performance' }"
          >
            Performance
            <span v-if="$route.path === '/performance'" class="absolute -bottom-6 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"></span>
          </router-link>
          <router-link
            to="/decision-helper"
            class="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            :class="{ 'text-blue-600 dark:text-blue-400': $route.path === '/decision-helper' }"
          >
            Decision Helper
            <span v-if="$route.path === '/decision-helper'" class="absolute -bottom-6 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"></span>
          </router-link>
          <router-link
            to="/community"
            class="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            :class="{ 'text-blue-600 dark:text-blue-400': $route.path === '/community' }"
          >
            Community
            <span v-if="$route.path === '/community'" class="absolute -bottom-6 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"></span>
          </router-link>
          
          <!-- Search Button -->
          <button
            @click="searchOpen = true"
            class="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <kbd class="hidden lg:inline-block px-1.5 py-0.5 text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 rounded">⌘K</kbd>
          </button>
          
          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>
        </div>
        
        <!-- Mobile Menu Button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <!-- Mobile Menu -->
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <div v-if="mobileMenuOpen" class="md:hidden pb-4">
        <router-link
          to="/"
          class="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          @click="mobileMenuOpen = false"
        >
          Home
        </router-link>
        <router-link
          to="/compare"
          class="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          @click="mobileMenuOpen = false"
        >
          Compare
        </router-link>
        <router-link
          to="/learn"
          class="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          @click="mobileMenuOpen = false"
        >
          Learn
        </router-link>
        <router-link
          to="/playground"
          class="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          @click="mobileMenuOpen = false"
        >
          Playground
        </router-link>
        <router-link
          to="/performance"
          class="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          @click="mobileMenuOpen = false"
        >
          Performance
        </router-link>
        <router-link
          to="/decision-helper"
          class="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          @click="mobileMenuOpen = false"
        >
          Decision Helper
        </router-link>
        <router-link
          to="/community"
          class="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          @click="mobileMenuOpen = false"
        >
          Community
        </router-link>
      </div>
    </transition>
    </div>
  </nav>
  
  <!-- Search Modal -->
  <SearchModal :is-open="searchOpen" @close="searchOpen = false" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SearchModal from '../SearchModal.vue'

const route = useRoute()
const mobileMenuOpen = ref(false)
const isDark = ref(false)
const searchOpen = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  // Check for saved theme preference or default to light
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
  
  // Add keyboard shortcut for search
  const handleKeydown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      searchOpen.value = true
    }
  }
  
  document.addEventListener('keydown', handleKeydown)
  
  // Cleanup
  return () => {
    document.removeEventListener('keydown', handleKeydown)
  }
})
</script>