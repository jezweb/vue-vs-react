import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { MotionPlugin } from '@vueuse/motion'
import { setupErrorHandler } from './utils/errorHandler'

const app = createApp(App)

// Setup global error handling
setupErrorHandler(app)

app.use(router)
app.use(MotionPlugin)
app.mount('#app')
