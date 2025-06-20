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
        <div v-else class="text-center">
          <h2 class="text-3xl font-bold mb-4">
            <span v-if="recommendation === 'react'" class="text-react-blue">React</span>
            <span v-else-if="recommendation === 'vue'" class="text-vue-green">Vue</span>
            <span v-else>Both frameworks</span>
            would be great for your project!
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-8">
            Based on your answers, we recommend exploring the framework above.
          </p>
          <button
            @click="resetQuiz"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentQuestion = ref(1)
const totalQuestions = ref(5)
const scores = ref({ react: 0, vue: 0 })
const recommendation = ref('')

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
}
</script>