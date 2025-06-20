<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
        Framework Decision Helper
      </h1>
      
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <!-- Progress Bar -->
        <div class="mb-8">
          <div class="flex justify-between mb-2">
            <span class="text-sm text-gray-600 dark:text-gray-400">Progress</span>
            <span class="text-sm text-gray-600 dark:text-gray-400">{{ Math.min(currentQuestion, totalQuestions) }}/{{ totalQuestions }}</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              class="bg-blue-600 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${Math.min((currentQuestion / totalQuestions) * 100, 100)}%` }"
            ></div>
          </div>
        </div>
        
        <!-- Question -->
        <div v-if="currentQuestion <= totalQuestions">
          <h2 class="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
            {{ questions[currentQuestion - 1].text }}
          </h2>
          
          <div class="space-y-3">
            <button
              v-for="option in questions[currentQuestion - 1].options"
              :key="option.id"
              @click="selectOption(option)"
              class="w-full p-4 text-left border border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all"
            >
              {{ option.text }}
            </button>
          </div>
        </div>
        
        <!-- Results -->
        <div v-else>
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold mb-4">
              <span v-if="recommendation === 'react'" class="text-react-blue">React</span>
              <span v-else-if="recommendation === 'vue'" class="text-vue-green">Vue</span>
              <span v-else>Both frameworks</span>
              would be great for your project!
            </h2>
            <p class="text-gray-600 dark:text-gray-400">
              Based on your answers, we recommend exploring the framework above.
            </p>
          </div>
          
          <!-- Score Breakdown -->
          <div class="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Score Breakdown</h3>
            <div class="space-y-3">
              <div>
                <div class="flex justify-between mb-1">
                  <span class="text-react-blue font-medium">React</span>
                  <span class="text-gray-600 dark:text-gray-400">{{ scores.react }} points</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                  <div 
                    class="bg-react-blue h-3 rounded-full transition-all duration-500"
                    :style="{ width: `${(scores.react / (scores.react + scores.vue)) * 100}%` }"
                  ></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between mb-1">
                  <span class="text-vue-green font-medium">Vue</span>
                  <span class="text-gray-600 dark:text-gray-400">{{ scores.vue }} points</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                  <div 
                    class="bg-vue-green h-3 rounded-full transition-all duration-500"
                    :style="{ width: `${(scores.vue / (scores.react + scores.vue)) * 100}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Detailed Analysis -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Why This Recommendation?</h3>
            <div class="space-y-3">
              <div 
                v-for="(reason, index) in detailedReasons" 
                :key="index"
                class="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                :class="{
                  'border-l-4 border-react-blue': reason.framework === 'react',
                  'border-l-4 border-vue-green': reason.framework === 'vue'
                }"
              >
                <span class="text-2xl mr-3">{{ reason.icon }}</span>
                <div>
                  <span class="font-medium" :class="{
                    'text-react-blue': reason.framework === 'react',
                    'text-vue-green': reason.framework === 'vue'
                  }">
                    {{ reason.framework === 'react' ? 'React' : 'Vue' }}:
                  </span>
                  <span class="text-gray-700 dark:text-gray-300 ml-2">{{ reason.reason }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Next Steps -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Recommended Next Steps</h3>
            <div class="grid md:grid-cols-3 gap-4">
              <div 
                v-for="(section, index) in getRecommendations(recommendation)" 
                :key="index"
                class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
              >
                <h4 class="font-medium text-gray-800 dark:text-gray-200 mb-2">{{ section.title }}</h4>
                <ul class="space-y-1">
                  <li v-for="item in section.items" :key="item" class="text-sm text-gray-600 dark:text-gray-400">
                    • {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              @click="resetQuiz"
              class="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Start Over
            </button>
            <router-link
              to="/compare"
              class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
            >
              View Detailed Comparison
            </router-link>
            <router-link
              to="/playground"
              class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center"
            >
              Try in Playground
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMotion } from '@vueuse/motion'

const currentQuestion = ref(1)
const totalQuestions = ref(5)
const scores = ref({ react: 0, vue: 0 })
const recommendation = ref('')
const answers = ref([])

const questions = [
  {
    text: "What's your team's experience level?",
    options: [
      { id: 1, text: "Mostly beginners or mixed experience", react: 0, vue: 2 },
      { id: 2, text: "Experienced JavaScript developers", react: 2, vue: 1 },
      { id: 3, text: "Full-stack developers", react: 1, vue: 1 }
    ]
  },
  {
    text: "What type of project are you building?",
    options: [
      { id: 1, text: "Small to medium web application", react: 1, vue: 2 },
      { id: 2, text: "Large enterprise application", react: 2, vue: 1 },
      { id: 3, text: "Progressive web app", react: 1, vue: 2 }
    ]
  },
  {
    text: "How important is ecosystem size?",
    options: [
      { id: 1, text: "Very important - need lots of libraries", react: 2, vue: 0 },
      { id: 2, text: "Somewhat important", react: 1, vue: 1 },
      { id: 3, text: "Not important - prefer simplicity", react: 0, vue: 2 }
    ]
  },
  {
    text: "Do you need mobile app development?",
    options: [
      { id: 1, text: "Yes, native mobile is required", react: 2, vue: 0 },
      { id: 2, text: "Maybe in the future", react: 1, vue: 1 },
      { id: 3, text: "No, web only", react: 0, vue: 1 }
    ]
  },
  {
    text: "What's your preference for syntax?",
    options: [
      { id: 1, text: "HTML-like templates", react: 0, vue: 2 },
      { id: 2, text: "JavaScript all the way (JSX)", react: 2, vue: 0 },
      { id: 3, text: "No strong preference", react: 1, vue: 1 }
    ]
  }
]

const selectOption = (option) => {
  scores.value.react += option.react || 0
  scores.value.vue += option.vue || 0
  
  // Store the answer for later analysis
  answers.value.push({
    question: questions[currentQuestion.value - 1].text,
    answer: option.text,
    questionIndex: currentQuestion.value - 1
  })
  
  if (currentQuestion.value < totalQuestions.value) {
    currentQuestion.value++
  } else {
    // Calculate recommendation
    if (scores.value.react > scores.value.vue) {
      recommendation.value = 'react'
    } else if (scores.value.vue > scores.value.react) {
      recommendation.value = 'vue'
    } else {
      recommendation.value = 'both'
    }
    currentQuestion.value++
  }
}

const resetQuiz = () => {
  currentQuestion.value = 1
  scores.value = { react: 0, vue: 0 }
  recommendation.value = ''
  answers.value = []
}

// Compute detailed reasons based on answers
const detailedReasons = computed(() => {
  const reasons = []
  
  answers.value.forEach((answer, index) => {
    const questionIndex = answer.questionIndex
    
    // Team experience
    if (questionIndex === 0) {
      if (answer.answer.includes('beginners')) {
        reasons.push({
          framework: 'vue',
          reason: 'Vue has a gentler learning curve with its template-based approach and excellent documentation',
          icon: '📚'
        })
      } else if (answer.answer.includes('Experienced JavaScript')) {
        reasons.push({
          framework: 'react',
          reason: 'React\'s functional approach and JSX will feel natural to experienced JS developers',
          icon: '💪'
        })
      }
    }
    
    // Project type
    if (questionIndex === 1) {
      if (answer.answer.includes('Small to medium')) {
        reasons.push({
          framework: 'vue',
          reason: 'Vue\'s all-in-one approach and built-in features make it perfect for rapid development',
          icon: '🚀'
        })
      } else if (answer.answer.includes('Large enterprise')) {
        reasons.push({
          framework: 'react',
          reason: 'React\'s flexibility and massive ecosystem excel in large-scale applications',
          icon: '🏢'
        })
      }
    }
    
    // Ecosystem
    if (questionIndex === 2) {
      if (answer.answer.includes('Very important')) {
        reasons.push({
          framework: 'react',
          reason: 'React has the largest ecosystem with solutions for virtually any requirement',
          icon: '📦'
        })
      } else if (answer.answer.includes('prefer simplicity')) {
        reasons.push({
          framework: 'vue',
          reason: 'Vue provides more built-in features, reducing the need for external libraries',
          icon: '✨'
        })
      }
    }
    
    // Mobile development
    if (questionIndex === 3) {
      if (answer.answer.includes('native mobile')) {
        reasons.push({
          framework: 'react',
          reason: 'React Native allows you to build native mobile apps with the same React knowledge',
          icon: '📱'
        })
      }
    }
    
    // Syntax preference
    if (questionIndex === 4) {
      if (answer.answer.includes('HTML-like templates')) {
        reasons.push({
          framework: 'vue',
          reason: 'Vue\'s template syntax is more familiar to developers with HTML/CSS background',
          icon: '🎨'
        })
      } else if (answer.answer.includes('JSX')) {
        reasons.push({
          framework: 'react',
          reason: 'JSX keeps everything in JavaScript, providing type safety and powerful tooling',
          icon: '⚡'
        })
      }
    }
  })
  
  return reasons
})

// Get framework-specific recommendations
const getRecommendations = (framework) => {
  const recommendations = {
    react: [
      { title: 'Start with', items: ['Official React Tutorial', 'Create React App', 'React DevTools'] },
      { title: 'Key concepts', items: ['Components & Props', 'State & Hooks', 'JSX Syntax'] },
      { title: 'Popular libraries', items: ['React Router', 'Redux/Zustand', 'Material-UI/Chakra UI'] }
    ],
    vue: [
      { title: 'Start with', items: ['Vue 3 Documentation', 'Vite + Vue', 'Vue DevTools'] },
      { title: 'Key concepts', items: ['Template Syntax', 'Reactivity System', 'Composition API'] },
      { title: 'Popular libraries', items: ['Vue Router', 'Pinia', 'Vuetify/Quasar'] }
    ],
    both: [
      { title: 'Consider', items: ['Team preferences', 'Project requirements', 'Long-term maintenance'] },
      { title: 'Try both', items: ['Build a small prototype', 'Compare developer experience', 'Evaluate performance'] },
      { title: 'Resources', items: ['Our comparison guide', 'Interactive playground', 'Community forums'] }
    ]
  }
  
  return recommendations[framework] || recommendations.both
}
</script>