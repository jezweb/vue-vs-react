import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Vue vs React - Interactive Comparison' }
  },
  {
    path: '/compare',
    name: 'Comparison',
    component: () => import('../views/Comparison.vue'),
    meta: { title: 'Detailed Comparison' }
  },
  {
    path: '/learn',
    name: 'Learn',
    component: () => import('../views/LearnPath.vue'),
    meta: { title: 'Learn Vue & React - Interactive Guide' }
  },
  {
    path: '/playground',
    name: 'Playground',
    component: () => import('../views/Playground.vue'),
    meta: { title: 'Code Playground - Vue vs React' }
  },
  {
    path: '/decision-helper',
    name: 'DecisionHelper',
    component: () => import('../views/DecisionHelper.vue'),
    meta: { title: 'Framework Decision Helper' }
  },
  {
    path: '/performance',
    name: 'Performance',
    component: () => import('../views/Performance.vue'),
    meta: { title: 'Performance Comparison - Vue vs React' }
  },
  {
    path: '/community',
    name: 'Community',
    component: () => import('../views/Community.vue'),
    meta: { title: 'Community Resources - Vue vs React' }
  },
  {
    path: '/migration',
    name: 'Migration',
    component: () => import('../views/MigrationGuide.vue'),
    meta: { title: 'Migration Guide - Vue vs React' }
  },
  {
    path: '/examples',
    name: 'Examples',
    component: () => import('../views/Examples.vue'),
    meta: { title: 'Real-World Examples - Vue vs React' }
  },
  {
    path: '/case-studies',
    name: 'CaseStudies',
    component: () => import('../views/CaseStudies.vue'),
    meta: { title: 'Industry Case Studies - Vue vs React' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Vue vs React'
  next()
})

export default router