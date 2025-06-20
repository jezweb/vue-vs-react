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
            <button class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors">
              Share
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
      <div class="h-64 bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700">
        <div class="p-3 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300">
          Output Preview
        </div>
        <div class="p-4">
          <div v-if="error" class="text-red-500">
            Error: {{ error }}
          </div>
          <div v-else-if="isRunning" class="text-gray-500 dark:text-gray-400">
            Running code...
          </div>
          <div v-else class="text-gray-500 dark:text-gray-400">
            Click "Run Code" to see the output
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, shallowRef } from 'vue'
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'

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

const reactEditor = shallowRef()
const vueEditor = shallowRef()

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

const runCode = () => {
  error.value = ''
  isRunning.value = true
  
  // Simulate running code
  setTimeout(() => {
    isRunning.value = false
    // In a real implementation, this would compile and run the code
    console.log('React code:', reactCode.value)
    console.log('Vue code:', vueCode.value)
  }, 1000)
}
</script>

<style>
/* Ensure Monaco Editor takes full height */
.vue-monaco-editor {
  height: 100% !important;
}
</style>