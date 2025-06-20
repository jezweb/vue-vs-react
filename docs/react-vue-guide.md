# React vs Vue: Comprehensive Developer Guide

## Table of Contents
1. [Overview](#overview)
2. [Philosophy & Architecture](#philosophy--architecture)
3. [Getting Started](#getting-started)
4. [Core Concepts with Examples](#core-concepts-with-examples)
5. [Advanced Patterns](#advanced-patterns)
6. [Ecosystem Comparison](#ecosystem-comparison)
7. [Performance Considerations](#performance-considerations)
8. [Testing Strategies](#testing-strategies)
9. [Migration Guide](#migration-guide)
10. [Decision Framework](#decision-framework)
11. [Resources & Learning Paths](#resources--learning-paths)

## Overview

### Quick Comparison Table

| Aspect | React | Vue |
|--------|-------|-----|
| Type | Library | Progressive Framework |
| Learning Curve | Moderate to Steep | Gentle |
| Template Syntax | JSX | HTML-based templates |
| State Management | Hooks (useState, useReducer) | Reactive data properties |
| Component Format | JavaScript functions/classes | Single File Components |
| Ecosystem Maturity | Very Mature | Mature |
| Community Size | Massive | Large |
| Corporate Backing | Meta (Facebook) | Independent (Evan You) |
| Mobile Solution | React Native | NativeScript-Vue, Quasar |

## Philosophy & Architecture

### React Philosophy
- **"Just JavaScript"**: React embraces JavaScript fully, using JSX as a syntax extension
- **Composition over Configuration**: Build complex UIs from simple components
- **Unidirectional Data Flow**: Data flows down, events flow up
- **Functional Programming**: Emphasis on pure functions and immutability
- **Minimal API Surface**: Learn once, write anywhere

### Vue Philosophy
- **Progressive Framework**: Incrementally adoptable from library to full framework
- **Template-Based**: Familiar HTML-like syntax with powerful directives
- **Reactive by Design**: Automatic dependency tracking and updates
- **Single File Components**: Co-locate template, logic, and styles
- **Convention over Configuration**: Sensible defaults with escape hatches

## Getting Started

### React Setup

```bash
# Using Create React App (legacy but common)
npx create-react-app my-app
cd my-app
npm start

# Using Vite (recommended)
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
npm run dev

# Using Next.js (full-stack)
npx create-next-app@latest my-app
cd my-app
npm run dev
```

### Vue Setup

```bash
# Using Vue CLI (legacy but common)
npm install -g @vue/cli
vue create my-app
cd my-app
npm run serve

# Using Vite (recommended)
npm create vue@latest
cd my-vue-app
npm install
npm run dev

# Using Nuxt (full-stack)
npx nuxi init my-app
cd my-app
npm install
npm run dev
```

## Core Concepts with Examples

### 1. Component Definition

#### React Component
```jsx
// Functional Component (recommended)
import React from 'react';

function UserCard({ user, onUpdate }) {
  return (
    <div className="user-card">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button onClick={() => onUpdate(user.id)}>
        Update
      </button>
    </div>
  );
}

export default UserCard;

// With TypeScript
interface UserCardProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
  onUpdate: (id: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onUpdate }) => {
  // Component logic
};
```

#### Vue Component
```vue
<template>
  <div class="user-card">
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
    <button @click="$emit('update', user.id)">
      Update
    </button>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  emits: ['update']
}
</script>

<!-- With Composition API and TypeScript -->
<script setup lang="ts">
interface User {
  id: string;
  name: string;
  email: string;
}

defineProps<{
  user: User;
}>();

defineEmits<{
  update: [id: string];
}>();
</script>

<style scoped>
.user-card {
  padding: 1rem;
  border: 1px solid #ccc;
}
</style>
```

### 2. State Management

#### React State
```jsx
// Local State with Hooks
import React, { useState, useReducer } from 'react';

function TodoApp() {
  // Simple state
  const [input, setInput] = useState('');
  
  // Complex state with reducer
  const [todos, dispatch] = useReducer(todoReducer, []);
  
  function todoReducer(state, action) {
    switch (action.type) {
      case 'add':
        return [...state, { id: Date.now(), text: action.text, done: false }];
      case 'toggle':
        return state.map(todo =>
          todo.id === action.id ? { ...todo, done: !todo.done } : todo
        );
      case 'delete':
        return state.filter(todo => todo.id !== action.id);
      default:
        return state;
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch({ type: 'add', text: input });
      setInput('');
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add todo..."
        />
        <button type="submit">Add</button>
      </form>
      
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => dispatch({ type: 'toggle', id: todo.id })}
            />
            <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'delete', id: todo.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

#### Vue State
```vue
<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input
        v-model="input"
        placeholder="Add todo..."
      />
      <button type="submit">Add</button>
    </form>
    
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input
          type="checkbox"
          v-model="todo.done"
        />
        <span :style="{ textDecoration: todo.done ? 'line-through' : 'none' }">
          {{ todo.text }}
        </span>
        <button @click="deleteTodo(todo.id)">
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
// Options API
export default {
  data() {
    return {
      input: '',
      todos: []
    }
  },
  methods: {
    handleSubmit() {
      if (this.input.trim()) {
        this.todos.push({
          id: Date.now(),
          text: this.input,
          done: false
        });
        this.input = '';
      }
    },
    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
    }
  }
}
</script>

<!-- Composition API -->
<script setup>
import { ref, reactive } from 'vue';

const input = ref('');
const todos = ref([]);

function handleSubmit() {
  if (input.value.trim()) {
    todos.value.push({
      id: Date.now(),
      text: input.value,
      done: false
    });
    input.value = '';
  }
}

function deleteTodo(id) {
  todos.value = todos.value.filter(todo => todo.id !== id);
}
</script>
```

### 3. Computed Values & Side Effects

#### React
```jsx
import React, { useState, useMemo, useEffect } from 'react';

function ExpensiveComponent({ items }) {
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  
  // Computed value with useMemo
  const filteredAndSortedItems = useMemo(() => {
    console.log('Recomputing filtered items...');
    
    const filtered = items.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
    
    return filtered.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      }
      return b.price - a.price;
    });
  }, [items, filter, sortOrder]);
  
  // Side effect with useEffect
  useEffect(() => {
    console.log(`Displaying ${filteredAndSortedItems.length} items`);
    
    // Cleanup function
    return () => {
      console.log('Component unmounting...');
    };
  }, [filteredAndSortedItems.length]);
  
  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter items..."
      />
      
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
      
      <ul>
        {filteredAndSortedItems.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

#### Vue
```vue
<template>
  <div>
    <input
      v-model="filter"
      placeholder="Filter items..."
    />
    
    <select v-model="sortOrder">
      <option value="asc">Price: Low to High</option>
      <option value="desc">Price: High to Low</option>
    </select>
    
    <ul>
      <li v-for="item in filteredAndSortedItems" :key="item.id">
        {{ item.name }} - ${{ item.price }}
      </li>
    </ul>
  </div>
</template>

<script>
// Options API
export default {
  props: ['items'],
  data() {
    return {
      filter: '',
      sortOrder: 'asc'
    }
  },
  computed: {
    filteredAndSortedItems() {
      console.log('Recomputing filtered items...');
      
      const filtered = this.items.filter(item =>
        item.name.toLowerCase().includes(this.filter.toLowerCase())
      );
      
      return filtered.sort((a, b) => {
        if (this.sortOrder === 'asc') {
          return a.price - b.price;
        }
        return b.price - a.price;
      });
    }
  },
  watch: {
    filteredAndSortedItems(newItems) {
      console.log(`Displaying ${newItems.length} items`);
    }
  },
  mounted() {
    console.log('Component mounted');
  },
  beforeUnmount() {
    console.log('Component unmounting...');
  }
}
</script>

<!-- Composition API -->
<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps(['items']);
const filter = ref('');
const sortOrder = ref('asc');

const filteredAndSortedItems = computed(() => {
  console.log('Recomputing filtered items...');
  
  const filtered = props.items.filter(item =>
    item.name.toLowerCase().includes(filter.value.toLowerCase())
  );
  
  return filtered.sort((a, b) => {
    if (sortOrder.value === 'asc') {
      return a.price - b.price;
    }
    return b.price - a.price;
  });
});

watch(() => filteredAndSortedItems.value.length, (newLength) => {
  console.log(`Displaying ${newLength} items`);
});

onMounted(() => {
  console.log('Component mounted');
});

onBeforeUnmount(() => {
  console.log('Component unmounting...');
});
</script>
```

### 4. Component Communication

#### React
```jsx
// Parent Component
function ParentComponent() {
  const [message, setMessage] = useState('');
  const [childData, setChildData] = useState(null);
  
  const handleChildData = (data) => {
    setChildData(data);
  };
  
  return (
    <div>
      <h1>Parent Component</h1>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message to child..."
      />
      
      <ChildComponent 
        message={message}
        onDataSend={handleChildData}
      />
      
      {childData && (
        <div>
          <h2>Data from Child:</h2>
          <pre>{JSON.stringify(childData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

// Child Component
function ChildComponent({ message, onDataSend }) {
  const [localData, setLocalData] = useState({ count: 0 });
  
  const sendDataToParent = () => {
    onDataSend(localData);
  };
  
  const incrementCount = () => {
    setLocalData(prev => ({ count: prev.count + 1 }));
  };
  
  return (
    <div>
      <h2>Child Component</h2>
      <p>Message from parent: {message}</p>
      <p>Local count: {localData.count}</p>
      
      <button onClick={incrementCount}>Increment</button>
      <button onClick={sendDataToParent}>Send to Parent</button>
    </div>
  );
}
```

#### Vue
```vue
<!-- ParentComponent.vue -->
<template>
  <div>
    <h1>Parent Component</h1>
    <input
      v-model="message"
      placeholder="Message to child..."
    />
    
    <ChildComponent 
      :message="message"
      @data-send="handleChildData"
    />
    
    <div v-if="childData">
      <h2>Data from Child:</h2>
      <pre>{{ JSON.stringify(childData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: { ChildComponent },
  data() {
    return {
      message: '',
      childData: null
    }
  },
  methods: {
    handleChildData(data) {
      this.childData = data;
    }
  }
}
</script>

<!-- ChildComponent.vue -->
<template>
  <div>
    <h2>Child Component</h2>
    <p>Message from parent: {{ message }}</p>
    <p>Local count: {{ localData.count }}</p>
    
    <button @click="incrementCount">Increment</button>
    <button @click="sendDataToParent">Send to Parent</button>
  </div>
</template>

<script>
export default {
  props: ['message'],
  emits: ['dataSend'],
  data() {
    return {
      localData: { count: 0 }
    }
  },
  methods: {
    incrementCount() {
      this.localData.count++;
    },
    sendDataToParent() {
      this.$emit('dataSend', this.localData);
    }
  }
}
</script>
```

### 5. Conditional Rendering & Lists

#### React
```jsx
function ConditionalList({ users, showActive }) {
  const filteredUsers = showActive 
    ? users.filter(user => user.active) 
    : users;
  
  if (filteredUsers.length === 0) {
    return <p>No users to display</p>;
  }
  
  return (
    <div>
      <h2>User List ({filteredUsers.length} users)</h2>
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>
            <span>{user.name}</span>
            {user.admin && <span> (Admin)</span>}
            {user.active ? (
              <span style={{ color: 'green' }}> ● Active</span>
            ) : (
              <span style={{ color: 'red' }}> ● Inactive</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

#### Vue
```vue
<template>
  <div>
    <p v-if="filteredUsers.length === 0">No users to display</p>
    
    <template v-else>
      <h2>User List ({{ filteredUsers.length }} users)</h2>
      <ul>
        <li v-for="user in filteredUsers" :key="user.id">
          <span>{{ user.name }}</span>
          <span v-if="user.admin"> (Admin)</span>
          <span v-if="user.active" style="color: green"> ● Active</span>
          <span v-else style="color: red"> ● Inactive</span>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
export default {
  props: ['users', 'showActive'],
  computed: {
    filteredUsers() {
      return this.showActive 
        ? this.users.filter(user => user.active)
        : this.users;
    }
  }
}
</script>
```

## Advanced Patterns

### 1. Custom Hooks (React) vs Composables (Vue)

#### React Custom Hook
```jsx
// useLocalStorage.js
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue];
}

// Usage
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [language, setLanguage] = useLocalStorage('language', 'en');
  
  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
      </select>
    </div>
  );
}
```

#### Vue Composable
```javascript
// useLocalStorage.js
import { ref, watch } from 'vue';

export function useLocalStorage(key, initialValue) {
  const storedValue = ref(initialValue);
  
  // Load initial value
  try {
    const item = window.localStorage.getItem(key);
    if (item) {
      storedValue.value = JSON.parse(item);
    }
  } catch (error) {
    console.error(error);
  }
  
  // Watch for changes and update localStorage
  watch(storedValue, (newValue) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error(error);
    }
  }, { deep: true });
  
  return storedValue;
}

// Usage in component
<template>
  <div>
    <select v-model="theme">
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
    
    <select v-model="language">
      <option value="en">English</option>
      <option value="es">Spanish</option>
    </select>
  </div>
</template>

<script setup>
import { useLocalStorage } from './useLocalStorage';

const theme = useLocalStorage('theme', 'light');
const language = useLocalStorage('language', 'en');
</script>
```

### 2. Context (React) vs Provide/Inject (Vue)

#### React Context
```jsx
// ThemeContext.js
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// App component
function App() {
  return (
    <ThemeProvider>
      <Header />
      <MainContent />
    </ThemeProvider>
  );
}

// Child component
function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className={`header ${theme}`}>
      <button onClick={toggleTheme}>
        Toggle Theme (Current: {theme})
      </button>
    </header>
  );
}
```

#### Vue Provide/Inject
```vue
<!-- App.vue -->
<template>
  <div :class="`app ${theme}`">
    <Header />
    <MainContent />
  </div>
</template>

<script>
import { provide, ref } from 'vue';

export default {
  setup() {
    const theme = ref('light');
    
    const toggleTheme = () => {
      theme.value = theme.value === 'light' ? 'dark' : 'light';
    };
    
    provide('theme', theme);
    provide('toggleTheme', toggleTheme);
    
    return { theme };
  }
}
</script>

<!-- Header.vue -->
<template>
  <header :class="`header ${theme}`">
    <button @click="toggleTheme">
      Toggle Theme (Current: {{ theme }})
    </button>
  </header>
</template>

<script>
import { inject } from 'vue';

export default {
  setup() {
    const theme = inject('theme');
    const toggleTheme = inject('toggleTheme');
    
    return { theme, toggleTheme };
  }
}
</script>
```

### 3. Error Boundaries

#### React Error Boundary
```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Oops! Something went wrong</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
          </details>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary>
      <Header />
      <MainContent />
    </ErrorBoundary>
  );
}
```

#### Vue Error Handling
```vue
<!-- App.vue -->
<template>
  <div>
    <div v-if="error" class="error-fallback">
      <h2>Oops! Something went wrong</h2>
      <details style="white-space: pre-wrap">
        {{ error.toString() }}
      </details>
    </div>
    
    <template v-else>
      <Header />
      <MainContent />
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: null
    }
  },
  errorCaptured(err, instance, info) {
    console.error('Error caught:', err, info);
    this.error = err;
    return false; // Prevent error from propagating
  }
}
</script>

<!-- Or using global error handler -->
<script>
// main.js
app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err, info);
  // Send to error tracking service
};
</script>
```

## Ecosystem Comparison

### State Management

#### React - Redux Toolkit
```jsx
// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({
        id: Date.now(),
        text: action.payload,
        completed: false
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  }
});

export const { addTodo, toggleTodo } = todosSlice.actions;
export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer
  }
});

// Component usage
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo } from './store';

function TodoList() {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  
  return (
    <div>
      <button onClick={() => dispatch(addTodo('New Todo'))}>
        Add Todo
      </button>
      {todos.map(todo => (
        <div key={todo.id} onClick={() => dispatch(toggleTodo(todo.id))}>
          {todo.text}
        </div>
      ))}
    </div>
  );
}
```

#### Vue - Pinia
```javascript
// stores/todos.js
import { defineStore } from 'pinia';

export const useTodosStore = defineStore('todos', {
  state: () => ({
    todos: []
  }),
  
  getters: {
    completedTodos: (state) => {
      return state.todos.filter(todo => todo.completed);
    }
  },
  
  actions: {
    addTodo(text) {
      this.todos.push({
        id: Date.now(),
        text,
        completed: false
      });
    },
    
    toggleTodo(id) {
      const todo = this.todos.find(t => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  }
});

// Component usage
<template>
  <div>
    <button @click="todosStore.addTodo('New Todo')">
      Add Todo
    </button>
    <div 
      v-for="todo in todosStore.todos" 
      :key="todo.id"
      @click="todosStore.toggleTodo(todo.id)"
    >
      {{ todo.text }}
    </div>
  </div>
</template>

<script setup>
import { useTodosStore } from '@/stores/todos';

const todosStore = useTodosStore();
</script>
```

### Routing

#### React Router
```jsx
// App.js
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users">Users</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />}>
          <Route path=":userId" element={<UserDetail />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function UserDetail() {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  return (
    <div>
      <h2>User {userId}</h2>
      <button onClick={() => navigate('/users')}>
        Back to Users
      </button>
    </div>
  );
}
```

#### Vue Router
```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('@/views/Users.vue'),
    children: [
      {
        path: ':userId',
        name: 'UserDetail',
        component: () => import('@/views/UserDetail.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
});

// Component usage
<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/users">Users</router-link>
    </nav>
    
    <router-view />
  </div>
</template>

// UserDetail.vue
<template>
  <div>
    <h2>User {{ userId }}</h2>
    <button @click="$router.push('/users')">
      Back to Users
    </button>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const userId = route.params.userId;
</script>
```

## Performance Considerations

### React Performance Optimization

```jsx
import React, { memo, useCallback, useMemo } from 'react';

// Memoized component
const ExpensiveChild = memo(({ data, onUpdate }) => {
  console.log('ExpensiveChild rendered');
  return (
    <div>
      {data.map(item => (
        <div key={item.id} onClick={() => onUpdate(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  );
});

// Parent component with optimizations
function ParentComponent({ items }) {
  const [selectedId, setSelectedId] = useState(null);
  
  // Memoized callback
  const handleUpdate = useCallback((id) => {
    setSelectedId(id);
  }, []);
  
  // Memoized computation
  const processedData = useMemo(() => {
    return items.map(item => ({
      ...item,
      processed: true
    }));
  }, [items]);
  
  return (
    <ExpensiveChild 
      data={processedData} 
      onUpdate={handleUpdate}
    />
  );
}

// Code splitting with lazy loading
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </React.Suspense>
  );
}
```

### Vue Performance Optimization

```vue
<template>
  <div>
    <!-- v-once for static content -->
    <h1 v-once>{{ staticTitle }}</h1>
    
    <!-- v-memo for expensive lists -->
    <div
      v-for="item in processedData"
      :key="item.id"
      v-memo="[item.id, item.updated]"
    >
      {{ item.name }}
    </div>
    
    <!-- Keep-alive for component caching -->
    <keep-alive :max="10">
      <component :is="currentComponent" />
    </keep-alive>
    
    <!-- Lazy loading components -->
    <HeavyComponent v-if="showHeavy" />
  </div>
</template>

<script>
// Component-level code splitting
const HeavyComponent = defineAsyncComponent(() =>
  import('./HeavyComponent.vue')
);

export default {
  components: { HeavyComponent },
  
  computed: {
    // Computed properties are cached
    processedData() {
      return this.items.map(item => ({
        ...item,
        processed: true
      }));
    }
  },
  
  methods: {
    // Mark method as non-reactive
    handleUpdate: markRaw(function(id) {
      this.selectedId = id;
    })
  }
}
</script>
```

## Testing Strategies

### React Testing

```jsx
// Component.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoList } from './TodoList';

describe('TodoList', () => {
  test('adds a new todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('Add todo...');
    const button = screen.getByText('Add');
    
    await user.type(input, 'New todo item');
    await user.click(button);
    
    expect(screen.getByText('New todo item')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });
  
  test('toggles todo completion', async () => {
    render(<TodoList initialTodos={[
      { id: 1, text: 'Test todo', done: false }
    ]} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    
    fireEvent.click(checkbox);
    
    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });
  });
});

// Hook testing
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

test('useCounter hook', () => {
  const { result } = renderHook(() => useCounter(0));
  
  expect(result.current.count).toBe(0);
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});
```

### Vue Testing

```javascript
// Component.spec.js
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import TodoList from './TodoList.vue';

describe('TodoList', () => {
  it('adds a new todo', async () => {
    const wrapper = mount(TodoList);
    
    const input = wrapper.find('input[placeholder="Add todo..."]');
    const button = wrapper.find('button');
    
    await input.setValue('New todo item');
    await button.trigger('click');
    
    expect(wrapper.text()).toContain('New todo item');
    expect(input.element.value).toBe('');
  });
  
  it('toggles todo completion', async () => {
    const wrapper = mount(TodoList, {
      props: {
        initialTodos: [
          { id: 1, text: 'Test todo', done: false }
        ]
      }
    });
    
    const checkbox = wrapper.find('input[type="checkbox"]');
    expect(checkbox.element.checked).toBe(false);
    
    await checkbox.trigger('click');
    
    expect(checkbox.element.checked).toBe(true);
  });
});

// Composable testing
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('increments count', () => {
    const { count, increment } = useCounter(0);
    
    expect(count.value).toBe(0);
    
    increment();
    
    expect(count.value).toBe(1);
  });
});
```

## Migration Guide

### React to Vue Migration

#### Component Structure
```jsx
// React Component
import React, { useState, useEffect } from 'react';
import './UserCard.css';

function UserCard({ user, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [localUser, setLocalUser] = useState(user);
  
  useEffect(() => {
    console.log('User updated:', localUser);
  }, [localUser]);
  
  const handleSave = () => {
    onEdit(localUser);
    setIsEditing(false);
  };
  
  return (
    <div className="user-card">
      {isEditing ? (
        <input
          value={localUser.name}
          onChange={(e) => setLocalUser({
            ...localUser,
            name: e.target.value
          })}
        />
      ) : (
        <h3>{localUser.name}</h3>
      )}
      
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel' : 'Edit'}
      </button>
      
      {isEditing && (
        <button onClick={handleSave}>Save</button>
      )}
    </div>
  );
}
```

```vue
<!-- Vue Equivalent -->
<template>
  <div class="user-card">
    <input 
      v-if="isEditing"
      v-model="localUser.name"
    />
    <h3 v-else>{{ localUser.name }}</h3>
    
    <button @click="isEditing = !isEditing">
      {{ isEditing ? 'Cancel' : 'Edit' }}
    </button>
    
    <button v-if="isEditing" @click="handleSave">
      Save
    </button>
  </div>
</template>

<script>
export default {
  props: ['user'],
  emits: ['edit'],
  data() {
    return {
      isEditing: false,
      localUser: { ...this.user }
    }
  },
  watch: {
    localUser: {
      handler(newUser) {
        console.log('User updated:', newUser);
      },
      deep: true
    }
  },
  methods: {
    handleSave() {
      this.$emit('edit', this.localUser);
      this.isEditing = false;
    }
  }
}
</script>

<style scoped>
.user-card {
  /* styles */
}
</style>
```

### Vue to React Migration

#### Template to JSX
```vue
<!-- Vue Template -->
<template>
  <div class="product-list">
    <div v-if="loading">Loading...</div>
    
    <template v-else>
      <div v-if="error" class="error">
        {{ error }}
      </div>
      
      <div v-else-if="products.length === 0">
        No products found
      </div>
      
      <ul v-else>
        <li 
          v-for="product in filteredProducts" 
          :key="product.id"
          :class="{ active: product.id === selectedId }"
          @click="selectProduct(product.id)"
        >
          <img :src="product.image" :alt="product.name">
          <span>{{ product.name }} - ${{ product.price }}</span>
        </li>
      </ul>
    </template>
  </div>
</template>
```

```jsx
// React JSX Equivalent
function ProductList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  
  const filteredProducts = useMemo(() => {
    // filtering logic
    return products;
  }, [products]);
  
  const selectProduct = (id) => {
    setSelectedId(id);
  };
  
  if (loading) return <div>Loading...</div>;
  
  if (error) {
    return <div className="error">{error}</div>;
  }
  
  if (products.length === 0) {
    return <div>No products found</div>;
  }
  
  return (
    <div className="product-list">
      <ul>
        {filteredProducts.map(product => (
          <li
            key={product.id}
            className={product.id === selectedId ? 'active' : ''}
            onClick={() => selectProduct(product.id)}
          >
            <img src={product.image} alt={product.name} />
            <span>{product.name} - ${product.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Decision Framework

### When to Choose React

✅ **Choose React when:**
- Building large-scale enterprise applications
- Need maximum flexibility and customization
- Team has strong JavaScript/TypeScript skills
- Want access to the largest ecosystem of libraries
- Planning to build mobile apps (React Native)
- Need cutting-edge features and patterns
- Want to hire from a large talent pool
- Building a highly interactive, complex UI

❌ **Avoid React when:**
- Need to prototype quickly
- Team includes designers or junior developers
- Want minimal configuration
- Building simple to medium complexity apps
- Prefer convention over configuration

### When to Choose Vue

✅ **Choose Vue when:**
- Rapid prototyping or MVP development
- Team has mixed skill levels
- Want a gentle learning curve
- Prefer template-based syntax
- Building medium-sized applications
- Want built-in features (transitions, state management)
- Need excellent documentation
- Incrementally adopting a framework

❌ **Avoid Vue when:**
- Need the largest possible ecosystem
- Building React Native mobile apps
- Want maximum job market opportunities
- Need cutting-edge experimental features
- Require extensive enterprise support

## Performance Metrics Comparison

| Metric | React | Vue |
|--------|-------|-----|
| Bundle Size (min+gzip) | ~45KB | ~34KB |
| Runtime Performance | Excellent | Excellent |
| Memory Usage | Good | Very Good |
| Initial Load Time | Good | Very Good |
| Re-render Optimization | Manual (memo, useMemo) | Automatic |
| Build Time | Good | Good |
| Dev Server Start | Good (with Vite) | Excellent |

## Common Pitfalls & Solutions

### React Common Issues

1. **Stale Closures**
```jsx
// Problem
function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1); // Always adds 1 to initial count
    }, 1000);
    
    return () => clearInterval(timer);
  }, []); // Empty deps array
}

// Solution
function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => c + 1); // Use functional update
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
}
```

2. **Unnecessary Re-renders**
```jsx
// Problem
function Parent() {
  const [count, setCount] = useState(0);
  
  // Creates new function on every render
  const handleClick = () => {
    console.log('Clicked');
  };
  
  return <Child onClick={handleClick} />;
}

// Solution
function Parent() {
  const [count, setCount] = useState(0);
  
  // Memoize the callback
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []);
  
  return <Child onClick={handleClick} />;
}
```

### Vue Common Issues

1. **Reactivity Loss**
```javascript
// Problem
export default {
  data() {
    return {
      user: {
        name: 'John'
      }
    }
  },
  methods: {
    addProperty() {
      this.user.age = 25; // Not reactive in Vue 2
    }
  }
}

// Solution (Vue 3)
import { reactive } from 'vue';

export default {
  setup() {
    const user = reactive({
      name: 'John'
    });
    
    function addProperty() {
      user.age = 25; // Reactive in Vue 3
    }
    
    return { user, addProperty };
  }
}
```

2. **Prop Mutation**
```vue
<!-- Problem -->
<template>
  <input v-model="user.name" /> <!-- Mutating prop directly -->
</template>

<script>
export default {
  props: ['user']
}
</script>

<!-- Solution -->
<template>
  <input 
    :value="user.name" 
    @input="$emit('update:user', { ...user, name: $event.target.value })"
  />
</template>

<script>
export default {
  props: ['user'],
  emits: ['update:user']
}
</script>
```

## Resources & Learning Paths

### React Learning Path

1. **Fundamentals**
   - Official React Tutorial
   - React Beta Docs
   - JavaScript ES6+ features
   - JSX syntax and rules

2. **Intermediate**
   - Hooks in depth
   - Context API
   - Performance optimization
   - Testing with React Testing Library

3. **Advanced**
   - Server Components
   - Concurrent features
   - Custom hooks patterns
   - Advanced patterns (HOCs, Render Props)

4. **Ecosystem**
   - Next.js for full-stack
   - Redux Toolkit for state
   - React Query for server state
   - React Hook Form for forms

### Vue Learning Path

1. **Fundamentals**
   - Vue 3 Documentation
   - Template syntax
   - Reactivity basics
   - Component basics

2. **Intermediate**
   - Composition API
   - Custom directives
   - Transitions
   - Vue DevTools

3. **Advanced**
   - Render functions
   - Plugin development
   - Performance optimization
   - TypeScript with Vue

4. **Ecosystem**
   - Nuxt 3 for full-stack
   - Pinia for state
   - VueUse for composables
   - Vuelidate for validation

## Conclusion

Both React and Vue are excellent choices for modern web development. The decision should be based on:

1. **Team expertise** - React requires stronger JavaScript skills
2. **Project requirements** - Complex apps favor React, rapid development favors Vue
3. **Ecosystem needs** - React has more options, Vue has cohesive official solutions
4. **Learning curve** - Vue is easier to start, React has more to master
5. **Long-term maintenance** - Both are well-maintained with strong communities

Remember: The best framework is the one that helps your team ship quality products efficiently. Both React and Vue can build anything you need - the differences are in the developer experience and ecosystem.

## Code Repository Structure

When building your comparison project, consider this structure:

```
react-vue-comparison/
├── react-examples/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── contexts/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── vue-examples/
│   ├── src/
│   │   ├── components/
│   │   ├── composables/
│   │   ├── stores/
│   │   └── App.vue
│   ├── package.json
│   └── vite.config.js
├── shared/
│   ├── data/
│   ├── styles/
│   └── utils/
└── README.md
```

This structure allows you to maintain parallel examples and share common resources between both frameworks.