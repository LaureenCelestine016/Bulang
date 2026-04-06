<template>
  <div
    class="flex justify-between items-center bg-white/5 backdrop-blur-md text-white px-6 py-3 border-b border-white/10"
  >
    <div class="flex items-center gap-2">
      <span class="text-xs text-gray-400">STATUS</span>
      <span
        class="flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs"
      >
        <span class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        CLOSED
      </span>
    </div>

    <div class="flex items-center gap-4">
      <span>{{ time }}</span>
      <div class="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center">AD</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const time = ref('')

onMounted(() => {
  setInterval(() => {
    time.value = new Date().toLocaleTimeString()
  }, 1000)
})
</script>
