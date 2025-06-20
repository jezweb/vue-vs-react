<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <div class="h-full flex flex-col">
      <!-- Header -->
      <div class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-4">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-200">Code Playground</h1>
          <div class="flex gap-2">
            <select 
              v-model="selectedExample" 
              @change="loadExample"
              class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded border border-gray-300 dark:border-gray-600"
            >
              <option value="">Select Example</option>
              <option value="counter">Counter</option>
              <option value="todoList">Todo List</option>
              <option value="fetchData">Fetch Data</option>
            </select>
            <button 
              @click="runCode"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Run Code
            </button>
            <button 
              @click="shareCode"
              class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              {{ shareButtonText }}
            </button>
          </div>
        </div>
      </div>
      
      <!-- Playground Content -->
      <div class="flex-1 flex">
        <!-- React Editor -->
        <div class="flex-1 flex flex-col border-r border-gray-300 dark:border-gray-700">
          <div class="bg-react-dark text-white p-3 font-semibold flex items-center">
            <span class="text-react-blue mr-2">⚛</span> React
          </div>
          <div class="flex-1">
            <vue-monaco-editor
              v-model:value="reactCode"
              :options="editorOptions"
              language="javascript"
              theme="vs-dark"
              @mount="handleReactEditorMount"
            />
          </div>
        </div>
        
        <!-- Vue Editor -->
        <div class="flex-1 flex flex-col">
          <div class="bg-vue-dark text-white p-3 font-semibold flex items-center">
            <span class="text-vue-green mr-2">▲</span> Vue
          </div>
          <div class="flex-1">
            <vue-monaco-editor
              v-model:value="vueCode"
              :options="editorOptions"
              language="javascript"
              theme="vs-dark"
              @mount="handleVueEditorMount"
            />
          </div>
        </div>
      </div>
      
      <!-- Output Preview -->
      <div class="h-96 bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700">
        <div class="p-3 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300 flex justify-between items-center">
          <span>Output Preview</span>
          <div class="flex gap-2">
            <button 
              @click="activeOutput = 'react'"
              :class="[
                'px-3 py-1 text-sm rounded transition-colors',
                activeOutput === 'react' 
                  ? 'bg-react-blue text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              ]"
            >
              React Output
            </button>
            <button 
              @click="activeOutput = 'vue'"
              :class="[
                'px-3 py-1 text-sm rounded transition-colors',
                activeOutput === 'vue' 
                  ? 'bg-vue-green text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              ]"
            >
              Vue Output
            </button>
          </div>
        </div>
        <div class="h-full relative">
          <div v-if="error" class="p-4 text-red-500">
            Error: {{ error }}
          </div>
          <div v-else-if="isRunning" class="p-4 text-gray-500 dark:text-gray-400">
            <LoadingSpinner />
            <p class="text-center mt-2">Compiling and running code...</p>
          </div>
          <div v-else-if="!hasRun" class="p-4 text-gray-500 dark:text-gray-400 text-center">
            Click "Run Code" to see the output
          </div>
          <div v-else class="h-full">
            <!-- React Output -->
            <iframe
              v-show="activeOutput === 'react'"
              ref="reactFrame"
              :srcdoc="reactOutput"
              class="w-full h-full bg-white"
              sandbox="allow-scripts"
              style="height: calc(100% - 52px);"
            ></iframe>
            <!-- Vue Output -->
            <iframe
              v-show="activeOutput === 'vue'"
              ref="vueFrame"
              :srcdoc="vueOutput"
              class="w-full h-full bg-white"
              sandbox="allow-scripts"
              style="height: calc(100% - 52px);"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, shallowRef, onMounted } from 'vue'
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'

const reactCode = ref(`import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default Counter;`)

const vueCode = ref(`<template>
  <div>
    <h1>Count: {{ count }}</h1>
    <button @click="count++">
      Increment
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
<\/script>`)

const selectedExample = ref('')
const error = ref('')
const isRunning = ref(false)
const hasRun = ref(false)
const activeOutput = ref('react')
const reactOutput = ref('')
const vueOutput = ref('')

const reactEditor = shallowRef()
const vueEditor = shallowRef()
const reactFrame = ref(null)
const vueFrame = ref(null)
const shareButtonText = ref('Share')

const editorOptions = {
  automaticLayout: true,
  fontSize: 14,
  minimap: {
    enabled: false
  },
  scrollBeyondLastLine: false,
  wordWrap: 'on',
  lineNumbers: 'on',
  renderLineHighlight: 'all',
  quickSuggestions: {
    other: true,
    comments: true,
    strings: true
  },
  parameterHints: {
    enabled: true
  },
  suggestOnTriggerCharacters: true,
  acceptSuggestionOnEnter: 'on',
  tabCompletion: 'on',
  wordBasedSuggestions: true
}

const examples = {
  counter: {
    react: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}

export default Counter;`,
    vue: `<template>
  <div>
    <h1>Count: {{ count }}</h1>
    <button @click="count++">
      Increment
    </button>
    <button @click="count--">
      Decrement
    </button>
    <button @click="count = 0">
      Reset
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
<\/script>`
  },
  todoList: {
    react: `import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: input,
        done: false
      }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
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
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;`,
    vue: `<template>
  <div>
    <h1>Todo List</h1>
    <div>
      <input
        v-model="input"
        @keypress.enter="addTodo"
        placeholder="Add a todo..."
      />
      <button @click="addTodo">Add</button>
    </div>
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
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const todos = ref([])
const input = ref('')

const addTodo = () => {
  if (input.value.trim()) {
    todos.value.push({
      id: Date.now(),
      text: input.value,
      done: false
    })
    input.value = ''
  }
}

const toggleTodo = (id) => {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.done = !todo.done
  }
}

const deleteTodo = (id) => {
  todos.value = todos.value.filter(todo => todo.id !== id)
}
<\/script>`
  },
  fetchData: {
    react: `import React, { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data.slice(0, 5));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>User List</h1>
      <button onClick={fetchUsers}>Refresh</button>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;`,
    vue: `<template>
  <div>
    <h1>User List</h1>
    <button @click="fetchUsers">Refresh</button>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <ul v-else>
      <li v-for="user in users" :key="user.id">
        <strong>{{ user.name }}</strong> - {{ user.email }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const users = ref([])
const loading = ref(true)
const error = ref(null)

const fetchUsers = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await response.json()
    users.value = data.slice(0, 5)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUsers()
})
<\/script>`
  }
}

const handleReactEditorMount = (editor) => {
  reactEditor.value = editor
}

const handleVueEditorMount = (editor) => {
  vueEditor.value = editor
}

const loadExample = () => {
  if (selectedExample.value && examples[selectedExample.value]) {
    reactCode.value = examples[selectedExample.value].react
    vueCode.value = examples[selectedExample.value].vue
  }
}

const runCode = async () => {
  error.value = ''
  isRunning.value = true
  hasRun.value = true
  
  try {
    // Generate React output
    reactOutput.value = generateReactHTML(reactCode.value)
    
    // Generate Vue output
    vueOutput.value = generateVueHTML(vueCode.value)
    
    // Small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 500))
  } catch (err) {
    error.value = err.message
  } finally {
    isRunning.value = false
  }
}

const generateReactHTML = (code) => {
  // Create a standalone HTML page that runs the React code
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"><\/script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"><\/script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 20px;
      background: white;
    }
    button {
      background: #61DAFB;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      margin: 4px;
      font-size: 16px;
    }
    button:hover {
      background: #4fc3f7;
    }
    input {
      padding: 8px;
      margin: 4px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      padding: 8px;
      margin: 4px 0;
      background: #f5f5f5;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    ${code}
    
    // Render the component
    const root = ReactDOM.createRoot(document.getElementById('root'));
    const Component = typeof App !== 'undefined' ? App : (Counter || TodoList || UserList || (() => <div>No component exported</div>));
    root.render(<Component />);
  <\/script>
</body>
</html>`
}

const generateVueHTML = (code) => {
  // Extract template, script, and style from Vue SFC
  const templateMatch = code.match(/<template>([\s\S]*?)<\/template>/)
  const scriptMatch = code.match(/<script setup>([\s\S]*?)<\/script>/)
  
  const template = templateMatch ? templateMatch[1].trim() : '<div>No template found</div>'
  const script = scriptMatch ? scriptMatch[1].trim() : ''
  
  // Build the Vue imports dynamically
  const vueImports = ['createApp']
  if (script.includes('ref')) vueImports.push('ref')
  if (script.includes('reactive')) vueImports.push('reactive')
  if (script.includes('onMounted')) vueImports.push('onMounted')
  if (script.includes('computed')) vueImports.push('computed')
  if (script.includes('watch')) vueImports.push('watch')
  
  // Extract all const declarations
  const constDeclarations = script.match(/const\\s+(\\w+)/g) || []
  const returnValues = constDeclarations.map(match => match.replace('const ', '')).join(', ')
  
  // Create a standalone HTML page that runs the Vue code
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"><\/script>
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 20px;
      background: white;
    }
    button {
      background: #42b883;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      margin: 4px;
      color: white;
      font-size: 16px;
    }
    button:hover {
      background: #35a372;
    }
    input {
      padding: 8px;
      margin: 4px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      padding: 8px;
      margin: 4px 0;
      background: #f5f5f5;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  </style>
</head>
<body>
  <div id="app">${template}</div>
  <script>
    const { ${vueImports.join(', ')} } = Vue;
    
    createApp({
      setup() {
        ${script}
        
        return {
          ${returnValues}
        }
      }
    }).mount('#app')
  <\/script>
</body>
</html>`
}

const shareCode = () => {
  // Create a shareable state object
  const state = {
    react: reactCode.value,
    vue: vueCode.value,
    example: selectedExample.value
  }
  
  // Encode the state as base64
  const encoded = btoa(JSON.stringify(state))
  
  // Create the shareable URL
  const url = `${window.location.origin}${window.location.pathname}#share=${encoded}`
  
  // Copy to clipboard
  navigator.clipboard.writeText(url).then(() => {
    shareButtonText.value = 'Copied!'
    setTimeout(() => {
      shareButtonText.value = 'Share'
    }, 2000)
  }).catch(() => {
    // Fallback for older browsers
    const input = document.createElement('input')
    input.value = url
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
    shareButtonText.value = 'Copied!'
    setTimeout(() => {
      shareButtonText.value = 'Share'
    }, 2000)
  })
}

// Load shared code on mount
onMounted(() => {
  const hash = window.location.hash
  if (hash.startsWith('#share=')) {
    try {
      const encoded = hash.substring(7)
      const state = JSON.parse(atob(encoded))
      if (state.react) reactCode.value = state.react
      if (state.vue) vueCode.value = state.vue
      if (state.example) selectedExample.value = state.example
    } catch (err) {
      console.error('Failed to load shared code:', err)
    }
  }
})
</script>

<style>
/* Ensure Monaco Editor takes full height */
.vue-monaco-editor {
  height: 100% !important;
}
</style>