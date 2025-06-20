<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-200">
          Interactive Learning Path
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          Learn React and Vue step by step with interactive tutorials
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <!-- Framework Selector -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="font-semibold text-gray-800 dark:text-gray-200">Choose Framework</h2>
            </div>
            <div class="p-4 space-y-2">
              <button
                @click="selectedFramework = 'react'"
                :class="[
                  'w-full px-4 py-3 rounded-lg transition-colors flex items-center justify-between',
                  selectedFramework === 'react'
                    ? 'bg-react-blue text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                ]"
              >
                <span class="flex items-center">
                  <span class="text-2xl mr-2">⚛</span>
                  React
                </span>
                <span v-if="selectedFramework === 'react'">✓</span>
              </button>
              <button
                @click="selectedFramework = 'vue'"
                :class="[
                  'w-full px-4 py-3 rounded-lg transition-colors flex items-center justify-between',
                  selectedFramework === 'vue'
                    ? 'bg-vue-green text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                ]"
              >
                <span class="flex items-center">
                  <span class="text-2xl mr-2">▲</span>
                  Vue
                </span>
                <span v-if="selectedFramework === 'vue'">✓</span>
              </button>
            </div>
          </div>

          <!-- Lesson List -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="font-semibold text-gray-800 dark:text-gray-200">
                {{ selectedFramework === 'react' ? 'React' : 'Vue' }} Lessons
              </h2>
            </div>
            <div class="p-4 space-y-2">
              <button
                v-for="(lesson, index) in currentLessons"
                :key="lesson.id"
                @click="selectedLesson = lesson.id"
                :class="[
                  'w-full text-left p-4 rounded-lg transition-all',
                  selectedLesson === lesson.id
                    ? 'bg-blue-50 dark:bg-blue-900 border-2 border-blue-500'
                    : 'bg-gray-50 dark:bg-gray-700 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                ]"
              >
                <div class="flex items-start">
                  <span
                    :class="[
                      'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3',
                      completedLessons.includes(lesson.id)
                        ? 'bg-green-500 text-white'
                        : selectedLesson === lesson.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                    ]"
                  >
                    {{ completedLessons.includes(lesson.id) ? '✓' : index + 1 }}
                  </span>
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-800 dark:text-gray-200">{{ lesson.title }}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ lesson.description }}</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <!-- Progress -->
          <div class="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Your Progress</h3>
            <div class="bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                class="bg-green-500 h-full transition-all duration-300"
                :style="{ width: `${progressPercentage}%` }"
              ></div>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {{ completedLessons.length }} of {{ currentLessons.length }} lessons completed
            </p>
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="lg:col-span-2">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {{ currentLessonData?.title || 'Select a lesson' }}
              </h2>
            </div>
            
            <div v-if="currentLessonData" class="p-6">
              <!-- Lesson Content -->
              <div class="prose dark:prose-invert max-w-none mb-8">
                <div v-html="currentLessonData.content"></div>
              </div>

              <!-- Code Editor -->
              <div class="mb-6">
                <div class="flex justify-between items-center mb-4">
                  <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Try it yourself:
                  </h3>
                  <button
                    @click="runLessonCode"
                    class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Run Code
                  </button>
                </div>
                
                <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <vue-monaco-editor
                    v-model:value="lessonCode"
                    :options="editorOptions"
                    language="javascript"
                    theme="vs-dark"
                    class="h-64"
                  />
                </div>
              </div>

              <!-- Output -->
              <div v-if="showOutput" class="mb-6">
                <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Output:
                </h3>
                <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                  <iframe
                    v-if="!outputError"
                    ref="outputFrame"
                    :srcdoc="outputHtml"
                    class="w-full h-64 bg-white rounded"
                    sandbox="allow-scripts"
                  ></iframe>
                  <div v-else class="text-red-500">
                    Error: {{ outputError }}
                  </div>
                </div>
              </div>

              <!-- Challenge -->
              <div v-if="currentLessonData.challenge" class="mb-6">
                <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Challenge:
                </h3>
                <div class="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
                  <p class="text-gray-800 dark:text-gray-200">{{ currentLessonData.challenge }}</p>
                </div>
              </div>

              <!-- Navigation -->
              <div class="flex justify-between items-center mt-8">
                <button
                  @click="previousLesson"
                  :disabled="!hasPreviousLesson"
                  :class="[
                    'px-4 py-2 rounded transition-colors',
                    hasPreviousLesson
                      ? 'bg-gray-600 text-white hover:bg-gray-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  ]"
                >
                  ← Previous
                </button>
                
                <button
                  @click="completeLesson"
                  v-if="!completedLessons.includes(selectedLesson)"
                  class="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  Mark as Complete
                </button>
                <span v-else class="text-green-600 font-semibold">
                  ✓ Completed
                </span>
                
                <button
                  @click="nextLesson"
                  :disabled="!hasNextLesson"
                  :class="[
                    'px-4 py-2 rounded transition-colors',
                    hasNextLesson
                      ? 'bg-gray-600 text-white hover:bg-gray-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  ]"
                >
                  Next →
                </button>
              </div>
            </div>
            
            <div v-else class="p-12 text-center">
              <div class="text-6xl mb-4">📚</div>
              <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Ready to learn?
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Select a lesson from the sidebar to get started
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'

const selectedFramework = ref('react')
const selectedLesson = ref('')
const completedLessons = ref([])
const lessonCode = ref('')
const showOutput = ref(false)
const outputHtml = ref('')
const outputError = ref('')

const editorOptions = {
  automaticLayout: true,
  fontSize: 14,
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  wordWrap: 'on',
  lineNumbers: 'on',
}

// Lessons data
const reactLessons = [
  {
    id: 'react-hello',
    title: 'Hello World',
    description: 'Your first React component',
    content: `
      <h3>Welcome to React!</h3>
      <p>React is a JavaScript library for building user interfaces. Let's start with a simple "Hello World" component.</p>
      <p>In React, components are the building blocks of your application. They can be written as functions or classes.</p>
      <h4>Key Concepts:</h4>
      <ul>
        <li><strong>JSX</strong>: JavaScript XML syntax that looks like HTML</li>
        <li><strong>Components</strong>: Reusable pieces of UI</li>
        <li><strong>Props</strong>: Data passed to components</li>
      </ul>
    `,
    code: `function HelloWorld() {
  return (
    <div>
      <h1>Hello, World!</h1>
      <p>Welcome to React!</p>
    </div>
  );
}

// Try changing the text above!`,
    challenge: 'Modify the component to display your name instead of "World"'
  },
  {
    id: 'react-state',
    title: 'State & Props',
    description: 'Managing data in React',
    content: `
      <h3>Understanding State and Props</h3>
      <p><strong>Props</strong> are read-only data passed from parent to child components.</p>
      <p><strong>State</strong> is mutable data managed within a component using the <code>useState</code> hook.</p>
      <h4>The useState Hook:</h4>
      <ul>
        <li>Returns an array: [currentValue, setterFunction]</li>
        <li>Triggers re-renders when state changes</li>
        <li>Can hold any type of data</li>
      </ul>
    `,
    code: `function Counter() {
  const [count, setCount] = React.useState(0);
  
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
    </div>
  );
}`,
    challenge: 'Add a "Reset" button that sets the count back to 0'
  },
  {
    id: 'react-effects',
    title: 'Side Effects',
    description: 'Using useEffect for side effects',
    content: `
      <h3>The useEffect Hook</h3>
      <p>useEffect lets you perform side effects in function components:</p>
      <ul>
        <li>Data fetching</li>
        <li>Setting up subscriptions</li>
        <li>Manually changing the DOM</li>
        <li>Timers</li>
      </ul>
      <p>It runs after every render by default, but you can control when it runs with dependencies.</p>
    `,
    code: `function Timer() {
  const [seconds, setSeconds] = React.useState(0);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    
    // Cleanup function
    return () => clearInterval(interval);
  }, []); // Empty deps = run once
  
  return (
    <div>
      <h2>Timer: {seconds}s</h2>
    </div>
  );
}`,
    challenge: 'Add pause and resume buttons to control the timer'
  },
  {
    id: 'react-lists',
    title: 'Lists & Keys',
    description: 'Rendering dynamic lists',
    content: `
      <h3>Rendering Lists in React</h3>
      <p>Use the <code>map()</code> function to render lists of elements.</p>
      <p><strong>Important:</strong> Each item needs a unique <code>key</code> prop for React's reconciliation.</p>
      <h4>Why Keys Matter:</h4>
      <ul>
        <li>Help React identify which items have changed</li>
        <li>Improve performance of list updates</li>
        <li>Preserve component state correctly</li>
      </ul>
    `,
    code: `function TodoList() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: 'Learn React', done: false },
    { id: 2, text: 'Build an app', done: false }
  ]);
  
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id 
        ? { ...todo, done: !todo.done }
        : todo
    ));
  };
  
  return (
    <div>
      <h2>My Todos</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.done ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    challenge: 'Add functionality to add new todos to the list'
  }
]

const vueLessons = [
  {
    id: 'vue-hello',
    title: 'Hello World',
    description: 'Your first Vue component',
    content: `
      <h3>Welcome to Vue!</h3>
      <p>Vue is a progressive JavaScript framework for building user interfaces.</p>
      <p>Vue uses a template-based syntax that's closer to HTML, making it easy to learn.</p>
      <h4>Key Concepts:</h4>
      <ul>
        <li><strong>Templates</strong>: HTML-based template syntax</li>
        <li><strong>Reactivity</strong>: Automatic UI updates</li>
        <li><strong>Composition API</strong>: Modern way to organize logic</li>
      </ul>
    `,
    code: `<template>
  <div>
    <h1>Hello, {{ name }}!</h1>
    <p>Welcome to Vue!</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('World')

// Try changing the name value!
</script>`,
    challenge: 'Add an input field to change the name dynamically'
  },
  {
    id: 'vue-reactivity',
    title: 'Reactivity',
    description: "Vue's reactive system",
    content: `
      <h3>Vue's Reactivity System</h3>
      <p>Vue automatically tracks dependencies and updates the UI when data changes.</p>
      <h4>Reactive References:</h4>
      <ul>
        <li><code>ref()</code>: For primitive values</li>
        <li><code>reactive()</code>: For objects</li>
        <li><code>computed()</code>: For derived values</li>
      </ul>
      <p>Vue's reactivity is more automatic than React's state management.</p>
    `,
    code: `<template>
  <div>
    <h2>Count: {{ count }}</h2>
    <p>Double: {{ doubleCount }}</p>
    <button @click="count++">
      Increment
    </button>
    <button @click="count--">
      Decrement
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)
</script>`,
    challenge: 'Add a computed property that shows if the number is even or odd'
  },
  {
    id: 'vue-lifecycle',
    title: 'Lifecycle & Watchers',
    description: 'Component lifecycle in Vue',
    content: `
      <h3>Lifecycle Hooks & Watchers</h3>
      <p>Vue provides lifecycle hooks to run code at specific stages:</p>
      <ul>
        <li><code>onMounted</code>: After component is mounted</li>
        <li><code>onUpdated</code>: After reactive data changes</li>
        <li><code>onUnmounted</code>: Before component is destroyed</li>
      </ul>
      <p><code>watch</code> and <code>watchEffect</code> observe reactive data changes.</p>
    `,
    code: `<template>
  <div>
    <h2>Timer: {{ seconds }}s</h2>
    <p>Status: {{ status }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const seconds = ref(0)
const status = ref('Starting...')
let interval

onMounted(() => {
  status.value = 'Running'
  interval = setInterval(() => {
    seconds.value++
  }, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})

watch(seconds, (newVal) => {
  if (newVal === 10) {
    status.value = 'Reached 10 seconds!'
  }
})
</script>`,
    challenge: 'Add buttons to pause and reset the timer'
  },
  {
    id: 'vue-lists',
    title: 'Lists & v-for',
    description: 'Rendering lists in Vue',
    content: `
      <h3>List Rendering with v-for</h3>
      <p>Vue uses the <code>v-for</code> directive to render lists.</p>
      <p>Like React, you need to provide a <code>:key</code> attribute for each item.</p>
      <h4>v-for Features:</h4>
      <ul>
        <li>Can iterate over arrays and objects</li>
        <li>Provides index as second argument</li>
        <li>Can be used with <code>template</code> for multiple elements</li>
      </ul>
    `,
    code: `<template>
  <div>
    <h2>My Todos</h2>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <span
          :style="{
            textDecoration: todo.done ? 'line-through' : 'none',
            cursor: 'pointer'
          }"
          @click="toggleTodo(todo.id)"
        >
          {{ todo.text }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const todos = ref([
  { id: 1, text: 'Learn Vue', done: false },
  { id: 2, text: 'Build an app', done: false }
])

const toggleTodo = (id) => {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.done = !todo.done
  }
}
</script>`,
    challenge: 'Add v-model binding to add new todos with an input field'
  }
]

const currentLessons = computed(() => {
  return selectedFramework.value === 'react' ? reactLessons : vueLessons
})

const currentLessonData = computed(() => {
  return currentLessons.value.find(lesson => lesson.id === selectedLesson.value)
})

const progressPercentage = computed(() => {
  const completed = completedLessons.value.filter(id => 
    currentLessons.value.some(lesson => lesson.id === id)
  ).length
  return Math.round((completed / currentLessons.value.length) * 100)
})

const currentLessonIndex = computed(() => {
  return currentLessons.value.findIndex(lesson => lesson.id === selectedLesson.value)
})

const hasPreviousLesson = computed(() => currentLessonIndex.value > 0)
const hasNextLesson = computed(() => currentLessonIndex.value < currentLessons.value.length - 1)

// Watch for lesson changes
watch(selectedLesson, () => {
  if (currentLessonData.value) {
    lessonCode.value = currentLessonData.value.code
    showOutput.value = false
    outputError.value = ''
  }
})

// Watch for framework changes
watch(selectedFramework, () => {
  selectedLesson.value = currentLessons.value[0]?.id || ''
})

// Initialize
if (!selectedLesson.value && currentLessons.value.length > 0) {
  selectedLesson.value = currentLessons.value[0].id
}

const runLessonCode = () => {
  outputError.value = ''
  showOutput.value = true
  
  try {
    if (selectedFramework.value === 'react') {
      outputHtml.value = generateReactOutput(lessonCode.value)
    } else {
      outputHtml.value = generateVueOutput(lessonCode.value)
    }
  } catch (err) {
    outputError.value = err.message
  }
}

const generateReactOutput = (code) => {
  return `<!DOCTYPE html>
<html>
<head>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"><\/script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"><\/script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    button { padding: 8px 16px; margin: 4px; cursor: pointer; }
    ul { list-style: none; padding: 0; }
    li { padding: 8px; margin: 4px 0; background: #f0f0f0; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState, useEffect } = React;
    ${code}
    
    const App = HelloWorld || Counter || Timer || TodoList || (() => <div>No component found</div>);
    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
  <\/script>
</body>
</html>`
}

const generateVueOutput = (code) => {
  const templateMatch = code.match(/<template>([\\s\\S]*?)<\\/template>/)
  const scriptMatch = code.match(/<script setup>([\\s\\S]*?)<\\/script>/)
  
  const template = templateMatch ? templateMatch[1].trim() : ''
  const script = scriptMatch ? scriptMatch[1].trim() : ''
  
  return `<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"><\/script>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    button { padding: 8px 16px; margin: 4px; cursor: pointer; }
    ul { list-style: none; padding: 0; }
    li { padding: 8px; margin: 4px 0; background: #f0f0f0; }
  </style>
</head>
<body>
  <div id="app">${template}</div>
  <script>
    const { createApp, ref, reactive, computed, watch, watchEffect, onMounted, onUnmounted } = Vue;
    
    createApp({
      setup() {
        ${script}
        
        const exports = {};
        ${script.match(/const\\s+(\\w+)/g)?.map(match => {
          const varName = match.replace('const ', '');
          return `exports.${varName} = ${varName};`;
        }).join('\\n') || ''}
        
        return exports;
      }
    }).mount('#app')
  <\/script>
</body>
</html>`
}

const completeLesson = () => {
  if (!completedLessons.value.includes(selectedLesson.value)) {
    completedLessons.value.push(selectedLesson.value)
  }
}

const nextLesson = () => {
  if (hasNextLesson.value) {
    selectedLesson.value = currentLessons.value[currentLessonIndex.value + 1].id
  }
}

const previousLesson = () => {
  if (hasPreviousLesson.value) {
    selectedLesson.value = currentLessons.value[currentLessonIndex.value - 1].id
  }
}
</script>

<style scoped>
.prose h3 {
  @apply text-xl font-semibold mb-4;
}

.prose h4 {
  @apply text-lg font-semibold mb-2;
}

.prose p {
  @apply mb-4 text-gray-700 dark:text-gray-300;
}

.prose ul {
  @apply list-disc list-inside mb-4 space-y-1;
}

.prose code {
  @apply bg-gray-100 dark:bg-gray-700 px-1 rounded text-sm;
}

.vue-monaco-editor {
  height: 100% !important;
}
</style>