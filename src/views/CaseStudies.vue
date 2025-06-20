<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-200">
          Industry Case Studies
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          See how leading companies use React and Vue in production
        </p>
      </div>
    </div>

    <!-- Framework Tabs -->
    <div class="max-w-7xl mx-auto px-4 py-6">
      <div class="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
        <button
          @click="selectedFramework = 'react'"
          :class="[
            'px-6 py-3 font-semibold transition-colors relative',
            selectedFramework === 'react'
              ? 'text-react-blue'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          ]"
        >
          <span class="flex items-center space-x-2">
            <span class="text-2xl">⚛</span>
            <span>React Companies</span>
          </span>
          <div 
            v-if="selectedFramework === 'react'" 
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-react-blue"
          ></div>
        </button>
        
        <button
          @click="selectedFramework = 'vue'"
          :class="[
            'px-6 py-3 font-semibold transition-colors relative',
            selectedFramework === 'vue'
              ? 'text-vue-green'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          ]"
        >
          <span class="flex items-center space-x-2">
            <span class="text-2xl">▲</span>
            <span>Vue Companies</span>
          </span>
          <div 
            v-if="selectedFramework === 'vue'" 
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-vue-green"
          ></div>
        </button>
      </div>
    </div>

    <!-- Search and Filter -->
    <div class="max-w-7xl mx-auto px-4 pb-6">
      <div class="flex flex-wrap gap-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search companies..."
          class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg flex-1 min-w-[300px]"
        >
        <select
          v-model="selectedIndustry"
          class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
        >
          <option value="all">All Industries</option>
          <option value="tech">Technology</option>
          <option value="ecommerce">E-commerce</option>
          <option value="entertainment">Entertainment</option>
          <option value="finance">Finance</option>
          <option value="automotive">Automotive</option>
        </select>
      </div>
    </div>

    <!-- Case Studies Grid -->
    <div class="max-w-7xl mx-auto px-4 pb-12">
      <div v-if="filteredCompanies.length === 0" class="text-center py-12">
        <p class="text-gray-500 dark:text-gray-400">No companies found matching your criteria.</p>
      </div>
      
      <div v-else class="grid gap-6">
        <CaseStudyCard
          v-for="company in filteredCompanies"
          :key="company.id"
          :company="company"
          :framework="selectedFramework === 'react' ? 'React' : 'Vue'"
        />
      </div>
    </div>

    <!-- Summary Stats -->
    <div class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-12">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
          Framework Adoption Summary
        </h2>
        
        <div class="grid md:grid-cols-2 gap-8">
          <!-- React Stats -->
          <div class="bg-react-light dark:bg-gray-900 rounded-lg p-6">
            <h3 class="text-xl font-bold text-react-blue mb-6 flex items-center">
              <span class="text-3xl mr-3">⚛</span>
              React Adoption
            </h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-gray-700 dark:text-gray-300">Total Users Served</span>
                <span class="font-bold text-2xl text-gray-800 dark:text-gray-200">4B+</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-700 dark:text-gray-300">Companies Featured</span>
                <span class="font-bold text-2xl text-gray-800 dark:text-gray-200">{{ reactCompanies.length }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-700 dark:text-gray-300">Industries</span>
                <span class="font-bold text-2xl text-gray-800 dark:text-gray-200">10+</span>
              </div>
              <div class="mt-6">
                <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Key Strengths</h4>
                <ul class="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Large ecosystem and community</li>
                  <li>• Proven at massive scale</li>
                  <li>• React Native for mobile</li>
                  <li>• Strong TypeScript support</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Vue Stats -->
          <div class="bg-vue-light dark:bg-gray-900 rounded-lg p-6">
            <h3 class="text-xl font-bold text-vue-green mb-6 flex items-center">
              <span class="text-3xl mr-3">▲</span>
              Vue Adoption
            </h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-gray-700 dark:text-gray-300">Total Users Served</span>
                <span class="font-bold text-2xl text-gray-800 dark:text-gray-200">2B+</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-700 dark:text-gray-300">Companies Featured</span>
                <span class="font-bold text-2xl text-gray-800 dark:text-gray-200">{{ vueCompanies.length }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-700 dark:text-gray-300">Industries</span>
                <span class="font-bold text-2xl text-gray-800 dark:text-gray-200">8+</span>
              </div>
              <div class="mt-6">
                <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Key Strengths</h4>
                <ul class="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Gentle learning curve</li>
                  <li>• Excellent performance</li>
                  <li>• Progressive adoption</li>
                  <li>• Strong in Asia/Europe</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import CaseStudyCard from '../components/examples/CaseStudyCard.vue'

// State
const selectedFramework = ref('react')
const searchQuery = ref('')
const selectedIndustry = ref('all')
const reactCompanies = ref([])
const vueCompanies = ref([])

// Load case studies
onMounted(async () => {
  try {
    const [reactData, vueData] = await Promise.all([
      import('../data/case-studies/react-companies.json'),
      import('../data/case-studies/vue-companies.json')
    ])
    
    reactCompanies.value = reactData.default.companies
    vueCompanies.value = vueData.default.companies
  } catch (error) {
    console.error('Error loading case studies:', error)
  }
})

// Get industry from company data
const getIndustry = (company) => {
  // Infer industry from company data
  if (company.name.includes('Facebook') || company.name.includes('Discord')) return 'tech'
  if (company.name.includes('Airbnb') || company.name.includes('Uber')) return 'tech'
  if (company.name.includes('Netflix')) return 'entertainment'
  if (company.name.includes('PayPal')) return 'finance'
  if (company.name.includes('BMW')) return 'automotive'
  if (company.name.includes('Alibaba')) return 'ecommerce'
  if (company.name.includes('Nintendo')) return 'entertainment'
  if (company.name.includes('Adobe') || company.name.includes('Grammarly')) return 'tech'
  if (company.name.includes('GitLab') || company.name.includes('Laravel')) return 'tech'
  return 'other'
}

// Computed
const currentCompanies = computed(() => {
  return selectedFramework.value === 'react' ? reactCompanies.value : vueCompanies.value
})

const filteredCompanies = computed(() => {
  let filtered = currentCompanies.value
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(company => 
      company.name.toLowerCase().includes(query) ||
      company.description.toLowerCase().includes(query) ||
      company.usage.products.some(p => p.toLowerCase().includes(query))
    )
  }
  
  if (selectedIndustry.value !== 'all') {
    filtered = filtered.filter(company => 
      getIndustry(company) === selectedIndustry.value
    )
  }
  
  return filtered
})
</script>