<template>
  <div
    class="bg-slate-900 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex justify-between items-center border border-white/5"
  >
    <div>
      <p class="text-xl font-semibold">{{ game.gameDescription }}</p>
      <p class="text-sm text-gray-400 mt-1">
        {{ new Date(game.registeredAt).toLocaleString() }}
      </p>
      <span
        class="px-3 py-1 rounded-full text-xs mt-3 inline-block font-medium"
        :class="statusClasses"
      >
        {{ statusLabel }}
      </span>
    </div>

    <button
      v-if="canStartGame"
      @click="$emit('manage', game.gameCode)"
      class="bg-yellow-600 hover:bg-yellow-700 active:scale-95 transition px-5 py-2 rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Start Game
    </button>
    <button
      v-else
      @click="$emit('manage', game.gameCode)"
      class="bg-green-600 hover:bg-green-700 active:scale-95 transition px-5 py-2 rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
    >
      View Game
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  game: {
    type: Object,
    required: true,
  },
})

// Normalize status to 0,1,2 for consistent usage
const normalizedStatus = computed(() => {
  const status = props.game.gameStatus
  if (typeof status === 'string') {
    switch (status.toUpperCase()) {
      case 'PENDING':
        return 0
      case 'GAME STARTED':
        return 1
      case 'CLOSED':
        return 2
      default:
        return 0
    }
  } else {
    return status // already numeric
  }
})

// Badge label
const statusLabel = computed(() => {
  return normalizedStatus.value === 0
    ? 'PENDING'
    : normalizedStatus.value === 1
      ? 'GAME STARTED'
      : 'CLOSED'
})

// Badge classes
const statusClasses = computed(() => ({
  'bg-yellow-500/20 text-yellow-400': normalizedStatus.value === 0,
  'bg-green-500/20 text-green-400': normalizedStatus.value === 1,
  'bg-red-500/20 text-red-400': normalizedStatus.value === 2,
}))

// Disable button if not PENDING
const canStartGame = computed(() => normalizedStatus.value === 0)
</script>
