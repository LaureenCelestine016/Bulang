<template>
  <div class="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
    <!-- If login page -->
    <router-view v-if="isAuthPage" />

    <!-- If dashboard pages -->
    <MainLayout v-else />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from './components/layout/MainLayout.vue'

const route = useRoute()

// Check if login page
const isAuthPage = computed(() => {
  return route.path === '/'
})
</script>
