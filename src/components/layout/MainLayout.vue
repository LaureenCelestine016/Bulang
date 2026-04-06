<template>
  <div class="flex">
    <div
      class="flex-1 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] text-white min-h-screen"
    >
      <Header />
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
</script>
