<template>
  <div id="app">
    <Navigation />
    <router-view />
  </div>
</template>

<script setup>
import Navigation from './components/common/Navigation.vue'
import { useSEO } from './composables/useSEO'

// Initialize SEO
useSEO()
</script>