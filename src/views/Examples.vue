<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-200">
          Real-World Examples
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          Production-ready patterns and implementations for React and Vue
        </p>
      </div>
    </div>

    <!-- Filters -->
    <div class="max-w-7xl mx-auto px-4 py-6">
      <div class="flex flex-wrap gap-4">
        <select 
          v-model="selectedCategory"
          class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
        >
          <option value="all">All Categories</option>
          <option value="E-commerce">E-commerce</option>
          <option value="Dashboard">Dashboard</option>
          <option value="Social">Social App</option>
          <option value="Forms">Forms & Validation</option>
        </select>

        <select 
          v-model="selectedDifficulty"
          class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
        >
          <option value="all">All Difficulties</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search examples..."
          class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg flex-1 min-w-[200px]"
        >
      </div>
    </div>

    <!-- Examples List -->
    <div class="max-w-7xl mx-auto px-4 pb-8">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex items-center justify-center py-12">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p class="text-gray-600 dark:text-gray-400">Loading examples...</p>
        </div>
      </div>
      
      <!-- Error State -->
      <div v-else-if="loadError" class="text-center py-12">
        <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
          <p class="text-red-700 dark:text-red-400 mb-4">{{ loadError }}</p>
          <button
            @click="() => window.location.reload()"
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-else-if="filteredExamples.length === 0" class="text-center py-12">
        <p class="text-gray-500 dark:text-gray-400">No examples found matching your criteria.</p>
      </div>
      
      <!-- Examples -->
      <div v-else class="space-y-8">
        <ExampleShowcase
          v-for="example in filteredExamples"
          :key="example.id"
          :example="example"
          @open-playground="openInPlayground"
        />
      </div>
    </div>

    <!-- Performance Benchmarks Section -->
    <div class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-12">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-8">
          Performance Benchmarks
        </h2>
        
        <div class="grid md:grid-cols-2 gap-8">
          <BenchmarkChart
            title="Initial Load Performance"
            :metrics="loadMetrics"
          />
          
          <BenchmarkChart
            title="Runtime Performance"
            :metrics="runtimeMetrics"
          />
          
          <BenchmarkChart
            title="Bundle Sizes"
            :metrics="bundleMetrics"
          />
          
          <BenchmarkChart
            title="Mobile Performance"
            :metrics="mobileMetrics"
          />
        </div>

        <!-- Performance Tips -->
        <div class="mt-12 grid md:grid-cols-2 gap-8">
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <h3 class="text-lg font-bold text-react-blue mb-4">React Performance Tips</h3>
            <ul class="space-y-2">
              <li v-for="tip in performanceTips.react" :key="tip" class="flex items-start">
                <span class="text-blue-500 mr-2">•</span>
                <span class="text-gray-700 dark:text-gray-300">{{ tip }}</span>
              </li>
            </ul>
          </div>
          
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <h3 class="text-lg font-bold text-vue-green mb-4">Vue Performance Tips</h3>
            <ul class="space-y-2">
              <li v-for="tip in performanceTips.vue" :key="tip" class="flex items-start">
                <span class="text-green-500 mr-2">•</span>
                <span class="text-gray-700 dark:text-gray-300">{{ tip }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ExampleShowcase from '../components/examples/ExampleShowcase.vue'
import BenchmarkChart from '../components/examples/BenchmarkChart.vue'

const router = useRouter()

// State
const selectedCategory = ref('all')
const selectedDifficulty = ref('all')
const searchQuery = ref('')
const examples = ref([])
const benchmarks = ref({})
const performanceTips = ref({ react: [], vue: [] })
const isLoading = ref(true)
const loadError = ref(null)

// Load data
onMounted(async () => {
  try {
    isLoading.value = true
    loadError.value = null
    
    // Load example patterns
    const [ecommerce, dashboard] = await Promise.all([
      import('../data/examples/ecommerce-patterns.json'),
      import('../data/examples/dashboard-patterns.json')
    ])
    
    examples.value = [
      ...ecommerce.default.patterns,
      ...dashboard.default.patterns
    ]
    
    // Load performance benchmarks
    const performanceData = await import('../data/examples/performance-benchmarks.json')
    benchmarks.value = performanceData.default.benchmarks
    performanceTips.value = performanceData.default.optimizationTips
  } catch (error) {
    loadError.value = 'Failed to load examples. Please refresh the page.'
  } finally {
    isLoading.value = false
  }
})

// Computed
const filteredExamples = computed(() => {
  let filtered = examples.value
  
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(ex => ex.category === selectedCategory.value)
  }
  
  if (selectedDifficulty.value !== 'all') {
    filtered = filtered.filter(ex => ex.difficulty === selectedDifficulty.value)
  }
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(ex => 
      ex.title.toLowerCase().includes(query) ||
      ex.description.toLowerCase().includes(query) ||
      ex.concepts.some(c => c.toLowerCase().includes(query))
    )
  }
  
  return filtered
})

// Performance metrics for charts
const loadMetrics = computed(() => {
  if (!benchmarks.value.initialLoad) return []
  
  return benchmarks.value.initialLoad.metrics.map(metric => ({
    label: metric.appSize,
    react: parseFloat(metric.react.timeToInteractive),
    vue: parseFloat(metric.vue.timeToInteractive),
    type: 'time'
  }))
})

const runtimeMetrics = computed(() => {
  if (!benchmarks.value.runtime) return []
  
  return benchmarks.value.runtime.scenarios.slice(0, 2).map(scenario => ({
    label: scenario.name,
    react: parseFloat(scenario.react.initialRender),
    vue: parseFloat(scenario.vue.initialRender),
    type: 'time'
  }))
})

const bundleMetrics = computed(() => {
  if (!benchmarks.value.initialLoad) return []
  
  return benchmarks.value.initialLoad.metrics.map(metric => ({
    label: metric.appSize,
    react: parseFloat(metric.react.bundleSize),
    vue: parseFloat(metric.vue.bundleSize),
    type: 'size'
  }))
})

const mobileMetrics = computed(() => {
  if (!benchmarks.value.mobilePerformance) return []
  
  return benchmarks.value.mobilePerformance.devices.map(device => ({
    label: device.device,
    react: parseFloat(device.react.tti),
    vue: parseFloat(device.vue.tti),
    type: 'time'
  }))
})

// Methods
const openInPlayground = (example) => {
  // Navigate to playground with the example preloaded
  router.push({
    path: '/playground',
    query: {
      reactCode: encodeURIComponent(example.react.code),
      vueCode: encodeURIComponent(example.vue.code)
    }
  })
}
</script>