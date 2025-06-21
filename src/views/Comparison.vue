<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
        Detailed Comparison
      </h1>
      
      <!-- Topic Selector -->
      <div class="flex flex-wrap gap-2 justify-center mb-12">
        <button
          v-for="topic in topics"
          :key="topic.id"
          @click="selectedTopic = topic.id"
          :class="[
            'px-4 py-2 rounded-lg transition-all',
            selectedTopic === topic.id
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          ]"
        >
          {{ topic.name }}
        </button>
      </div>
      
      <!-- Comparison Content -->
      <div class="grid md:grid-cols-2 gap-8">
        <!-- React Side -->
        <div 
          v-motion
          :initial="{ opacity: 0, x: -30 }"
          :enter="{ opacity: 1, x: 0 }"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        >
          <div class="bg-react-dark text-white p-4">
            <h2 class="text-xl font-semibold flex items-center">
              <span class="text-react-blue mr-2">⚛</span> React
            </h2>
          </div>
          <div class="p-6">
            <transition name="code-fade" mode="out-in">
              <pre :key="selectedTopic" class="bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 p-4 rounded-lg overflow-x-auto">
                <code class="text-sm font-mono text-gray-800 dark:text-gray-200">{{ getReactCode() }}</code>
              </pre>
            </transition>
          </div>
        </div>
        
        <!-- Vue Side -->
        <div 
          v-motion
          :initial="{ opacity: 0, x: 30 }"
          :enter="{ opacity: 1, x: 0 }"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        >
          <div class="bg-vue-dark text-white p-4">
            <h2 class="text-xl font-semibold flex items-center">
              <span class="text-vue-green mr-2">▲</span> Vue
            </h2>
          </div>
          <div class="p-6">
            <transition name="code-fade" mode="out-in">
              <pre :key="selectedTopic" class="bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 p-4 rounded-lg overflow-x-auto">
                <code class="text-sm font-mono text-gray-800 dark:text-gray-200">{{ getVueCode() }}</code>
              </pre>
            </transition>
          </div>
        </div>
      </div>
      
      <!-- Explanation -->
      <div class="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h3 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Key Differences
        </h3>
        <div class="prose dark:prose-invert max-w-none">
          <p class="text-gray-600 dark:text-gray-400">
            {{ getExplanation() }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedTopic = ref('components')

const topics = [
  { id: 'components', name: 'Components' },
  { id: 'state', name: 'State Management' },
  { id: 'lifecycle', name: 'Lifecycle' },
  { id: 'events', name: 'Event Handling' },
  { id: 'conditional', name: 'Conditional Rendering' },
  { id: 'lists', name: 'Lists & Keys' },
  { id: 'forms', name: 'Forms' },
  { id: 'effects', name: 'Side Effects' }
]

const codeExamples = {
  components: {
    react: `function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Usage
<Welcome name="React" />`,
    vue: `<template>
  <h1>Hello, {{ name }}!</h1>
</template>

<script setup>
defineProps(['name'])
<\/script>

// Usage
<Welcome name="Vue" />`,
    explanation: "React uses JSX syntax and JavaScript functions for components, while Vue uses template-based syntax with Single File Components. Both approaches are powerful, but Vue's templates may feel more familiar to those coming from HTML/CSS backgrounds."
  },
  state: {
    react: `import { useState } from 'react';

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
    vue: `<template>
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
<\/script>`,
    explanation: "React uses the useState hook for state management, requiring explicit setter functions. Vue's reactivity system allows direct mutation of reactive references, making the code more concise and intuitive."
  },
  lifecycle: {
    react: `import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Component mounted or userId changed
    fetchUser(userId).then(setUser);
    
    return () => {
      // Cleanup on unmount
    };
  }, [userId]);
  
  return <div>{user?.name}</div>;
}`,
    vue: `<template>
  <div>{{ user?.name }}</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps(['userId'])
const user = ref(null)

onMounted(() => {
  fetchUser(props.userId).then(u => user.value = u)
})

watch(() => props.userId, (newId) => {
  fetchUser(newId).then(u => user.value = u)
})

onUnmounted(() => {
})
<\/script>`,
    explanation: "React consolidates lifecycle logic into useEffect with dependencies, while Vue provides separate lifecycle hooks. React's approach is more unified but Vue's explicit hooks can be clearer for specific lifecycle needs."
  },
  events: {
    react: `function Form() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  
  const handleInput = (e) => {
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleInput} />
      <button type="submit">Submit</button>
    </form>
  );
}`,
    vue: `<template>
  <form @submit.prevent="handleSubmit">
    <input @input="handleInput" />
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
const handleSubmit = () => {
}

const handleInput = (event) => {
}
<\/script>`,
    explanation: "Vue provides event modifiers like .prevent for common patterns, making event handling more declarative. React requires manual event handling but offers more flexibility in complex scenarios."
  },
  conditional: {
    react: `function Greeting({ user, isLoading }) {
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      {user ? (
        <h1>Welcome, {user.name}!</h1>
      ) : (
        <h1>Please log in</h1>
      )}
      {user?.isAdmin && <AdminPanel />}
    </div>
  );
}`,
    vue: `<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else>
    <h1 v-if="user">Welcome, {{ user.name }}!</h1>
    <h1 v-else>Please log in</h1>
    <AdminPanel v-if="user?.isAdmin" />
  </div>
</template>

<script setup>
defineProps(['user', 'isLoading'])
<\/script>`,
    explanation: "Vue's template directives (v-if, v-else, v-show) provide a clean syntax for conditionals. React uses JavaScript expressions and early returns, which can be more flexible but sometimes more verbose."
  },
  lists: {
    react: `function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          <button onClick={() => deleteTodo(todo.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}`,
    vue: `<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <span>{{ todo.text }}</span>
      <button @click="deleteTodo(todo.id)">
        Delete
      </button>
    </li>
  </ul>
</template>

<script setup>
defineProps(['todos'])

const deleteTodo = (id) => {
  // Delete logic
}
<\/script>`,
    explanation: "Both frameworks require unique keys for list items. Vue's v-for directive is more declarative, while React's map approach leverages JavaScript directly. Both are efficient with their virtual DOM implementations."
  },
  forms: {
    react: `function LoginForm() {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <form>
      <input
        name="username"
        value={form.username}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />
    </form>
  );
}`,
    vue: `<template>
  <form>
    <input
      v-model="form.username"
      name="username"
    />
    <input
      v-model="form.password"
      name="password"
      type="password"
    />
  </form>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  username: '',
  password: ''
})
<\/script>`,
    explanation: "Vue's v-model provides two-way data binding out of the box, making form handling extremely simple. React requires manual state management but offers more control over data flow."
  },
  effects: {
    react: `function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (!query) return;
    
    setLoading(true);
    const timeoutId = setTimeout(() => {
      searchAPI(query)
        .then(setResults)
        .finally(() => setLoading(false));
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [query]);
  
  return <div>{/* Results UI */}</div>;
}`,
    vue: `<template>
  <div><!-- Results UI --></div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps(['query'])
const results = ref([])
const loading = ref(false)

let timeoutId

watchEffect((onInvalidate) => {
  if (!props.query) return
  
  loading.value = true
  timeoutId = setTimeout(() => {
    searchAPI(props.query)
      .then(r => results.value = r)
      .finally(() => loading.value = false)
  }, 300)
  
  onInvalidate(() => clearTimeout(timeoutId))
})
<\/script>`,
    explanation: "React's useEffect with cleanup and Vue's watchEffect with onInvalidate provide similar capabilities for handling side effects. Both support automatic cleanup and dependency tracking."
  }
}

const getReactCode = () => {
  return codeExamples[selectedTopic.value]?.react || 'Select a topic to see the example'
}

const getVueCode = () => {
  return codeExamples[selectedTopic.value]?.vue || 'Select a topic to see the example'
}

const getExplanation = () => {
  return codeExamples[selectedTopic.value]?.explanation || 'Select a topic to see the explanation'
}
</script>

<style scoped>
.code-fade-enter-active,
.code-fade-leave-active {
  transition: opacity 0.3s ease;
}

.code-fade-enter-from,
.code-fade-leave-to {
  opacity: 0;
}
</style>