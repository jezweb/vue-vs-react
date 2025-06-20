<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-200">
          Migration Guide
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          Step-by-step guide for migrating between React and Vue
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Migration Direction Selector -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Choose Migration Path</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <button
            @click="direction = 'react-to-vue'"
            :class="[
              'p-6 rounded-lg border-2 transition-all',
              direction === 'react-to-vue'
                ? 'border-vue-green bg-vue-light dark:bg-gray-700'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
            ]"
          >
            <div class="flex items-center justify-center mb-3">
              <span class="text-3xl">⚛</span>
              <svg class="w-8 h-8 mx-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
              <span class="text-3xl">▲</span>
            </div>
            <h3 class="font-bold text-gray-800 dark:text-gray-200">React to Vue</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Migrate from React to Vue 3
            </p>
          </button>

          <button
            @click="direction = 'vue-to-react'"
            :class="[
              'p-6 rounded-lg border-2 transition-all',
              direction === 'vue-to-react'
                ? 'border-react-blue bg-react-light dark:bg-gray-700'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
            ]"
          >
            <div class="flex items-center justify-center mb-3">
              <span class="text-3xl">▲</span>
              <svg class="w-8 h-8 mx-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
              <span class="text-3xl">⚛</span>
            </div>
            <h3 class="font-bold text-gray-800 dark:text-gray-200">Vue to React</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Migrate from Vue to React
            </p>
          </button>
        </div>
      </div>

      <!-- Migration Content -->
      <div v-if="direction" class="space-y-8">
        <!-- Concept Mapping -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div class="border-b border-gray-200 dark:border-gray-700 p-6">
            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200">
              Concept Mapping
            </h2>
          </div>
          <div class="p-6">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th class="text-left py-3 px-4 font-semibold text-gray-800 dark:text-gray-200">
                      {{ direction === 'react-to-vue' ? 'React Concept' : 'Vue Concept' }}
                    </th>
                    <th class="text-left py-3 px-4 font-semibold text-gray-800 dark:text-gray-200">
                      {{ direction === 'react-to-vue' ? 'Vue Equivalent' : 'React Equivalent' }}
                    </th>
                    <th class="text-left py-3 px-4 font-semibold text-gray-800 dark:text-gray-200">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="mapping in currentMappings" :key="mapping.id" class="border-b border-gray-100 dark:border-gray-700">
                    <td class="py-3 px-4">
                      <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{{ mapping.from }}</code>
                    </td>
                    <td class="py-3 px-4">
                      <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{{ mapping.to }}</code>
                    </td>
                    <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {{ mapping.notes }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Code Examples -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div class="border-b border-gray-200 dark:border-gray-700 p-6">
            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200">
              Code Migration Examples
            </h2>
          </div>
          <div class="p-6 space-y-6">
            <div v-for="example in currentExamples" :key="example.id">
              <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-3">
                {{ example.title }}
              </h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    {{ direction === 'react-to-vue' ? 'React' : 'Vue' }}
                  </h4>
                  <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm"><code>{{ example.from }}</code></pre>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    {{ direction === 'react-to-vue' ? 'Vue' : 'React' }}
                  </h4>
                  <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm"><code>{{ example.to }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Migration Steps -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div class="border-b border-gray-200 dark:border-gray-700 p-6">
            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200">
              Step-by-Step Migration Process
            </h2>
          </div>
          <div class="p-6">
            <ol class="space-y-4">
              <li v-for="(step, index) in currentSteps" :key="index" class="flex">
                <span class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  {{ index + 1 }}
                </span>
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-1">{{ step.title }}</h3>
                  <p class="text-gray-600 dark:text-gray-400">{{ step.description }}</p>
                  <div v-if="step.code" class="mt-2">
                    <pre class="bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm overflow-x-auto"><code>{{ step.code }}</code></pre>
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </div>

        <!-- Common Gotchas -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div class="border-b border-gray-200 dark:border-gray-700 p-6">
            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200">
              Common Gotchas & Tips
            </h2>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div v-for="gotcha in currentGotchas" :key="gotcha.id" class="flex items-start">
                <svg class="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
                <div>
                  <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-1">{{ gotcha.title }}</h3>
                  <p class="text-gray-600 dark:text-gray-400">{{ gotcha.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tools & Resources -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div class="border-b border-gray-200 dark:border-gray-700 p-6">
            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200">
              Migration Tools & Resources
            </h2>
          </div>
          <div class="p-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-3">Automated Tools</h3>
                <ul class="space-y-2">
                  <li v-for="tool in currentTools" :key="tool.id" class="flex items-start">
                    <span class="text-green-500 mr-2">✓</span>
                    <div>
                      <a :href="tool.url" target="_blank" rel="noopener noreferrer" 
                         class="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                        {{ tool.name }}
                      </a>
                      <p class="text-sm text-gray-600 dark:text-gray-400">{{ tool.description }}</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-3">Helpful Resources</h3>
                <ul class="space-y-2">
                  <li v-for="resource in currentResources" :key="resource.id" class="flex items-start">
                    <span class="text-blue-500 mr-2">📚</span>
                    <div>
                      <a :href="resource.url" target="_blank" rel="noopener noreferrer" 
                         class="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                        {{ resource.name }}
                      </a>
                      <p class="text-sm text-gray-600 dark:text-gray-400">{{ resource.description }}</p>
                    </div>
                  </li>
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
import { ref, computed } from 'vue'

const direction = ref('react-to-vue')

// Concept mappings
const reactToVueMappings = [
  { id: 1, from: 'useState', to: 'ref / reactive', notes: 'Vue uses ref for primitives, reactive for objects' },
  { id: 2, from: 'useEffect', to: 'watch / watchEffect', notes: 'Vue separates watching from lifecycle' },
  { id: 3, from: 'useContext', to: 'provide / inject', notes: 'Similar concept, different API' },
  { id: 4, from: 'useMemo', to: 'computed', notes: 'Vue computed properties are automatically cached' },
  { id: 5, from: 'useCallback', to: 'No direct equivalent', notes: 'Not needed in Vue due to different reactivity model' },
  { id: 6, from: 'props', to: 'props', notes: 'Similar concept, Vue validates by default' },
  { id: 7, from: 'JSX', to: 'Template', notes: 'Vue uses HTML-based templates' },
  { id: 8, from: 'Fragment', to: 'Template with multiple roots', notes: 'Vue 3 supports fragments natively' },
  { id: 9, from: 'React.memo', to: 'No direct equivalent', notes: 'Vue optimizes automatically' },
  { id: 10, from: 'useReducer', to: 'Composition API custom logic', notes: 'Can implement similar patterns' }
]

const vueToReactMappings = [
  { id: 1, from: 'ref / reactive', to: 'useState', notes: 'React uses one hook for all state' },
  { id: 2, from: 'computed', to: 'useMemo', notes: 'React requires explicit memoization' },
  { id: 3, from: 'watch / watchEffect', to: 'useEffect', notes: 'React combines effects and lifecycle' },
  { id: 4, from: 'v-model', to: 'value + onChange', notes: 'React requires manual two-way binding' },
  { id: 5, from: 'v-if / v-show', to: 'Conditional rendering', notes: 'React uses JS expressions' },
  { id: 6, from: 'v-for', to: 'Array.map()', notes: 'React uses JS array methods' },
  { id: 7, from: 'Template', to: 'JSX', notes: 'React uses JavaScript XML syntax' },
  { id: 8, from: 'provide / inject', to: 'useContext', notes: 'Similar dependency injection' },
  { id: 9, from: 'slots', to: 'children props', notes: 'React passes components as props' },
  { id: 10, from: 'emits', to: 'callback props', notes: 'React uses callback functions' }
]

// Code examples
const reactToVueExamples = [
  {
    id: 1,
    title: 'Component with State',
    from: `// React Component
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`,
    to: `<!-- Vue Component -->
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="count++">
      Increment
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>`
  },
  {
    id: 2,
    title: 'Component with Side Effects',
    from: `// React Component
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  
  if (!user) return <div>Loading...</div>;
  
  return <div>{user.name}</div>;
}`,
    to: `<!-- Vue Component -->
<template>
  <div v-if="user">{{ user.name }}</div>
  <div v-else>Loading...</div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps(['userId'])
const user = ref(null)

watch(() => props.userId, async (newId) => {
  user.value = await fetchUser(newId)
}, { immediate: true })
</script>`
  },
  {
    id: 3,
    title: 'List Rendering',
    from: `// React Component
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}`,
    to: `<!-- Vue Component -->
<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      {{ todo.text }}
    </li>
  </ul>
</template>

<script setup>
defineProps(['todos'])
</script>`
  }
]

const vueToReactExamples = [
  {
    id: 1,
    title: 'Component with Computed Properties',
    from: `<!-- Vue Component -->
<template>
  <div>
    <input v-model="firstName" />
    <input v-model="lastName" />
    <p>Full name: {{ fullName }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const firstName = ref('')
const lastName = ref('')

const fullName = computed(() => 
  \`\${firstName.value} \${lastName.value}\`
)
</script>`,
    to: `// React Component
import React, { useState, useMemo } from 'react';

function NameForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const fullName = useMemo(() => 
    \`\${firstName} \${lastName}\`,
    [firstName, lastName]
  );
  
  return (
    <div>
      <input 
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />
      <input 
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />
      <p>Full name: {fullName}</p>
    </div>
  );
}`
  },
  {
    id: 2,
    title: 'Component with Slots/Children',
    from: `<!-- Vue Component -->
<template>
  <div class="card">
    <h2>{{ title }}</h2>
    <slot></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script setup>
defineProps(['title'])
</script>`,
    to: `// React Component
function Card({ title, children, footer }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
      {footer}
    </div>
  );
}

// Usage
<Card 
  title="My Card"
  footer={<div>Footer content</div>}
>
  Main content
</Card>`
  },
  {
    id: 3,
    title: 'Event Handling',
    from: `<!-- Vue Component -->
<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="input" />
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const input = ref('')
const emit = defineEmits(['submit'])

const handleSubmit = () => {
  emit('submit', input.value)
  input.value = ''
}
</script>`,
    to: `// React Component
import React, { useState } from 'react';

function Form({ onSubmit }) {
  const [input, setInput] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
    setInput('');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}`
  }
]

// Migration steps
const reactToVueSteps = [
  {
    title: 'Setup Vue Project',
    description: 'Create a new Vue 3 project using Vite or Vue CLI',
    code: 'npm create vue@latest my-vue-app'
  },
  {
    title: 'Install Dependencies',
    description: 'Map React dependencies to Vue equivalents (vue-router for react-router, pinia for redux, etc.)'
  },
  {
    title: 'Convert Components',
    description: 'Start with leaf components (no children) and work your way up. Convert JSX to Vue templates.'
  },
  {
    title: 'Migrate State Management',
    description: 'Convert React hooks to Vue Composition API. useState → ref/reactive, useEffect → watch/watchEffect'
  },
  {
    title: 'Update Routing',
    description: 'Convert React Router to Vue Router syntax, update route definitions and navigation'
  },
  {
    title: 'Migrate Styles',
    description: 'Vue supports scoped styles natively. Convert CSS-in-JS to scoped CSS or keep your existing approach'
  },
  {
    title: 'Update Build Configuration',
    description: 'Configure Vite/webpack for any special requirements from your React app'
  },
  {
    title: 'Test & Optimize',
    description: 'Thoroughly test the migrated application and optimize performance where needed'
  }
]

const vueToReactSteps = [
  {
    title: 'Setup React Project',
    description: 'Create a new React project using Create React App or Vite',
    code: 'npm create vite@latest my-react-app -- --template react'
  },
  {
    title: 'Install Dependencies',
    description: 'Map Vue dependencies to React equivalents (react-router-dom for vue-router, zustand/redux for pinia, etc.)'
  },
  {
    title: 'Convert Templates to JSX',
    description: 'Convert Vue templates to JSX syntax. Replace directives with JavaScript expressions.'
  },
  {
    title: 'Migrate Composition API to Hooks',
    description: 'Convert ref/reactive → useState, computed → useMemo, watch → useEffect'
  },
  {
    title: 'Update Component Communication',
    description: 'Replace emit with callback props, convert slots to children/render props'
  },
  {
    title: 'Migrate Routing',
    description: 'Convert Vue Router to React Router, update route components and navigation'
  },
  {
    title: 'Handle Styles',
    description: 'Convert scoped styles to CSS modules, styled-components, or your preferred React styling solution'
  },
  {
    title: 'Test & Optimize',
    description: 'Test all functionality and optimize with React.memo, useMemo, and useCallback where needed'
  }
]

// Common gotchas
const reactToVueGotchas = [
  {
    id: 1,
    title: 'Reactivity Differences',
    description: 'Vue\'s reactivity is more automatic. You don\'t need useCallback or React.memo equivalents in most cases.'
  },
  {
    id: 2,
    title: 'Template vs JSX',
    description: 'Vue templates are more restrictive but provide better optimization. Complex logic should go in computed properties.'
  },
  {
    id: 3,
    title: 'Two-way Binding',
    description: 'v-model provides automatic two-way binding. No need for separate value and onChange handlers.'
  },
  {
    id: 4,
    title: 'Direct DOM Access',
    description: 'Use template refs instead of useRef. Access with .value in script setup.'
  }
]

const vueToReactGotchas = [
  {
    id: 1,
    title: 'Manual Optimization',
    description: 'React requires explicit optimization with useMemo, useCallback, and React.memo for performance.'
  },
  {
    id: 2,
    title: 'No Built-in Transitions',
    description: 'React doesn\'t have built-in transition components. Use react-transition-group or CSS transitions.'
  },
  {
    id: 3,
    title: 'Event Handling',
    description: 'React doesn\'t have event modifiers. You need to handle preventDefault and stopPropagation manually.'
  },
  {
    id: 4,
    title: 'State Updates',
    description: 'React state updates are asynchronous and may be batched. Use functional updates when depending on previous state.'
  }
]

// Tools and resources
const reactToVueTools = [
  {
    id: 1,
    name: 'Vue DevTools',
    url: 'https://devtools.vuejs.org/',
    description: 'Essential browser extension for debugging Vue applications'
  },
  {
    id: 2,
    name: 'Volar',
    url: 'https://marketplace.visualstudio.com/items?itemName=Vue.volar',
    description: 'VS Code extension for Vue 3 development'
  }
]

const vueToReactTools = [
  {
    id: 1,
    name: 'React Developer Tools',
    url: 'https://react.dev/learn/react-developer-tools',
    description: 'Browser extension for debugging React applications'
  },
  {
    id: 2,
    name: 'ES7+ React Snippets',
    url: 'https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets',
    description: 'VS Code extension with helpful React snippets'
  }
]

const reactToVueResources = [
  {
    id: 1,
    name: 'Vue 3 Migration Guide',
    url: 'https://v3-migration.vuejs.org/',
    description: 'Official guide for migrating to Vue 3'
  },
  {
    id: 2,
    name: 'Vue Composition API',
    url: 'https://vuejs.org/guide/extras/composition-api-faq.html',
    description: 'Learn about Vue\'s Composition API'
  }
]

const vueToReactResources = [
  {
    id: 1,
    name: 'React Hooks Documentation',
    url: 'https://react.dev/reference/react',
    description: 'Complete guide to React Hooks'
  },
  {
    id: 2,
    name: 'Thinking in React',
    url: 'https://react.dev/learn/thinking-in-react',
    description: 'Understanding React\'s mental model'
  }
]

// Computed properties
const currentMappings = computed(() => 
  direction.value === 'react-to-vue' ? reactToVueMappings : vueToReactMappings
)

const currentExamples = computed(() =>
  direction.value === 'react-to-vue' ? reactToVueExamples : vueToReactExamples
)

const currentSteps = computed(() =>
  direction.value === 'react-to-vue' ? reactToVueSteps : vueToReactSteps
)

const currentGotchas = computed(() =>
  direction.value === 'react-to-vue' ? reactToVueGotchas : vueToReactGotchas
)

const currentTools = computed(() =>
  direction.value === 'react-to-vue' ? reactToVueTools : vueToReactTools
)

const currentResources = computed(() =>
  direction.value === 'react-to-vue' ? reactToVueResources : vueToReactResources
)
</script>