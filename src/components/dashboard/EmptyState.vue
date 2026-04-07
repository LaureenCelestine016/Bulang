<template>
  <div
    class="bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] rounded-xl p-6 shadow-xl border border-white/10"
  >
    <div class="flex flex-col items-center justify-center text-center text-gray-400 h-72">
      <div class="text-6xl mb-4">⚠️</div>
      <h2 class="text-xl text-yellow-400 mb-1">{{ title }}</h2>
      <p class="text-sm">{{ description }}</p>
      <div class="text-6xl mb-4">{{ icon }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'No active game',
  },
  description: {
    type: String,
    default: 'Please create a game to start.',
  },
  icon: {
    type: String,
    default: '⚠️',
  },
})
</script>
