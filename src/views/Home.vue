<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <!-- Hero Section -->
    <section class="relative overflow-hidden py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <h1 
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
          class="text-5xl md:text-7xl font-bold text-center mb-6"
        >
          <span class="text-react-blue">React</span>
          <span class="text-gray-700 dark:text-gray-300 mx-4">vs</span>
          <span class="text-vue-green">Vue</span>
        </h1>
        <p 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
          class="text-xl md:text-2xl text-center text-gray-600 dark:text-gray-400 mb-12"
        >
          An interactive comparison to help you choose the right framework
        </p>
        
        <div 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }"
          class="flex flex-col md:flex-row gap-4 justify-center mb-16"
        >
          <router-link
            to="/learn"
            class="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:scale-105 transition-all text-center font-medium"
          >
            Start Learning
          </router-link>
          <router-link
            to="/playground"
            class="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:scale-105 transition-all text-center font-medium"
          >
            Try Playground
          </router-link>
          <router-link
            to="/decision-helper"
            class="px-8 py-4 bg-gray-700 text-white rounded-lg hover:bg-gray-800 hover:scale-105 transition-all text-center font-medium"
          >
            Help Me Choose
          </router-link>
        </div>
      </div>
    </section>

    <!-- Quick Stats -->
    <section class="py-16 px-4">
      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        <div 
          v-motion
          :initial="{ opacity: 0, x: -50 }"
          :visible="{ opacity: 1, x: 0 }"
          class="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border-t-4 border-react-blue hover:shadow-xl transition-shadow"
        >
          <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">React</h2>
          <ul class="space-y-2 text-gray-600 dark:text-gray-400">
            <li v-motion :initial="{ opacity: 0, x: -20 }" :visible="{ opacity: 1, x: 0, transition: { delay: 100 } }">▦ Bundle Size: ~{{ FRAMEWORK_METRICS.react.bundleSize }} (gzipped)</li>
            <li v-motion :initial="{ opacity: 0, x: -20 }" :visible="{ opacity: 1, x: 0, transition: { delay: 150 } }">▦ Created by: Meta (Facebook)</li>
            <li v-motion :initial="{ opacity: 0, x: -20 }" :visible="{ opacity: 1, x: 0, transition: { delay: 200 } }">▦ Released: 2013</li>
            <li v-motion :initial="{ opacity: 0, x: -20 }" :visible="{ opacity: 1, x: 0, transition: { delay: 250 } }">▦ GitHub Stars: {{ FRAMEWORK_METRICS.react.githubStars }}</li>
            <li v-motion :initial="{ opacity: 0, x: -20 }" :visible="{ opacity: 1, x: 0, transition: { delay: 300 } }">▦ Type: UI Library</li>
          </ul>
        </div>
        
        <div 
          v-motion
          :initial="{ opacity: 0, x: 50 }"
          :visible="{ opacity: 1, x: 0 }"
          class="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border-t-4 border-vue-green hover:shadow-xl transition-shadow"
        >
          <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Vue</h2>
          <ul class="space-y-2 text-gray-600 dark:text-gray-400">
            <li v-motion :initial="{ opacity: 0, x: 20 }" :visible="{ opacity: 1, x: 0, transition: { delay: 100 } }">▦ Bundle Size: ~{{ FRAMEWORK_METRICS.vue.bundleSize }} (gzipped)</li>
            <li v-motion :initial="{ opacity: 0, x: 20 }" :visible="{ opacity: 1, x: 0, transition: { delay: 150 } }">▦ Created by: Evan You</li>
            <li v-motion :initial="{ opacity: 0, x: 20 }" :visible="{ opacity: 1, x: 0, transition: { delay: 200 } }">▦ Released: 2014</li>
            <li v-motion :initial="{ opacity: 0, x: 20 }" :visible="{ opacity: 1, x: 0, transition: { delay: 250 } }">▦ GitHub Stars: {{ FRAMEWORK_METRICS.vue.githubStars }}</li>
            <li v-motion :initial="{ opacity: 0, x: 20 }" :visible="{ opacity: 1, x: 0, transition: { delay: 300 } }">▦ Type: Progressive Framework</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Feature Preview -->
    <section class="py-16 px-4 bg-gray-100 dark:bg-gray-900">
      <div class="max-w-6xl mx-auto">
        <h2 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{ opacity: 1, y: 0 }"
          class="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200"
        >
          What You'll Find Here
        </h2>
        
        <div class="grid md:grid-cols-3 gap-6">
          <router-link
            to="/examples"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: 100 } }"
            class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg hover:-translate-y-1 transition-all block"
          >
            <div class="text-3xl mb-4">💡</div>
            <h3 class="text-xl font-semibold mb-2">Real-World Examples</h3>
            <p class="text-gray-600 dark:text-gray-400">
              E-commerce, dashboards, and social app patterns in both frameworks
            </p>
          </router-link>
          
          <router-link
            to="/case-studies"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: 200 } }"
            class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg hover:-translate-y-1 transition-all block"
          >
            <div class="text-3xl mb-4">🏢</div>
            <h3 class="text-xl font-semibold mb-2">Industry Case Studies</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Learn how Netflix, Alibaba, and others use React and Vue in production
            </p>
          </router-link>
          
          <router-link
            to="/playground"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: 300 } }"
            class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg hover:-translate-y-1 transition-all block"
          >
            <div class="text-3xl mb-4">▶</div>
            <h3 class="text-xl font-semibold mb-2">Interactive Playground</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Write and test code in both React and Vue simultaneously
            </p>
          </router-link>
        </div>

        <div class="grid md:grid-cols-3 gap-6 mt-6">
          <router-link
            to="/comparison"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: 400 } }"
            class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg hover:-translate-y-1 transition-all block"
          >
            <div class="text-3xl mb-4">▷</div>
            <h3 class="text-xl font-semibold mb-2">Side-by-Side Comparisons</h3>
            <p class="text-gray-600 dark:text-gray-400">
              See the same code written in both frameworks with live examples
            </p>
          </router-link>

          <router-link
            to="/performance"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: 500 } }"
            class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg hover:-translate-y-1 transition-all block"
          >
            <div class="text-3xl mb-4">⚡</div>
            <h3 class="text-xl font-semibold mb-2">Performance Benchmarks</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Real-world performance metrics and optimization strategies
            </p>
          </router-link>
          
          <router-link
            to="/decision-helper"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: 600 } }"
            class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg hover:-translate-y-1 transition-all block"
          >
            <div class="text-3xl mb-4">◉</div>
            <h3 class="text-xl font-semibold mb-2">Decision Helper</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Answer questions about your project to get a personalized recommendation
            </p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Featured Companies -->
    <section class="py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
          Trusted by Industry Leaders
        </h2>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
          <div class="text-center">
            <p class="text-xl font-bold text-react-blue">React</p>
            <p class="text-gray-600 dark:text-gray-400">Facebook, Netflix, Uber</p>
          </div>
          <div class="text-center">
            <p class="text-xl font-bold text-vue-green">Vue</p>
            <p class="text-gray-600 dark:text-gray-400">Alibaba, GitLab, BMW</p>
          </div>
          <div class="text-center">
            <p class="text-xl font-bold text-react-blue">React</p>
            <p class="text-gray-600 dark:text-gray-400">Airbnb, PayPal, Discord</p>
          </div>
          <div class="text-center">
            <p class="text-xl font-bold text-vue-green">Vue</p>
            <p class="text-gray-600 dark:text-gray-400">Grammarly, Nintendo, Adobe</p>
          </div>
        </div>
        
        <div class="text-center mt-8">
          <router-link 
            to="/case-studies" 
            class="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            Explore all case studies
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { FRAMEWORK_METRICS, ANIMATION_DELAYS } from '../config/constants'
</script>