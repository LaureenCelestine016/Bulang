<template>
  <div class="p-6 text-white">
    <!-- CARD -->
    <div
      class="bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] rounded-2xl p-6 shadow-xl border border-white/10"
    >
      <!-- HEADER -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <p class="text-gray-400 text-sm">Fight Number</p>
          <h1 class="text-3xl font-bold">#{{ fight.number }}</h1>
        </div>

        <div>
          <p class="text-gray-400 text-sm">Status</p>
          <span class="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
            {{ fight.status }}
          </span>
        </div>

        <div class="text-right">
          <p class="text-gray-400 text-sm">Betting Time Left</p>
          <h1 class="text-3xl font-bold">{{ timer }}</h1>
        </div>
      </div>

      <!-- WALA VS MERON -->
      <div class="grid grid-cols-2 gap-4 relative">
        <!-- WALA -->
        <div class="bg-blue-900/40 p-6 rounded-xl border border-blue-500/20 text-center">
          <h2 class="text-xl font-bold text-blue-300">WALA</h2>
          <p class="text-gray-300">{{ fight.wala }}</p>

          <p class="mt-4 text-sm text-gray-400">TOTAL BETS</p>
          <h1 class="text-2xl font-bold">₱ {{ totalWala }}</h1>

          <p class="text-xs text-gray-400 mt-2">ODDS</p>
          <p class="text-sm">{{ oddsWala }}</p>
        </div>

        <!-- MERON -->
        <div class="bg-red-900/40 p-6 rounded-xl border border-red-500/20 text-center">
          <h2 class="text-xl font-bold text-red-300">MERON</h2>
          <p class="text-gray-300">{{ fight.meron }}</p>

          <p class="mt-4 text-sm text-gray-400">TOTAL BETS</p>
          <h1 class="text-2xl font-bold">₱ {{ totalMeron }}</h1>

          <p class="text-xs text-gray-400 mt-2">ODDS</p>
          <p class="text-sm">{{ oddsMeron }}</p>
        </div>

        <!-- VS -->
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div class="bg-black px-4 py-2 rounded-full border border-white/10 text-sm">VS</div>
        </div>
      </div>

      <!-- ACTION BUTTONS -->
      <div class="flex flex-wrap gap-3 mt-6 justify-center">
        <button class="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-xl">+ CREATE FIGHT</button>

        <button class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl">▶ OPEN BETTING</button>

        <button class="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-xl">
          🔒 CLOSE BETTING
        </button>

        <button class="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl">
          ⚡ START FIGHT
        </button>
      </div>

      <!-- DECLARE WINNER -->
      <div class="mt-6 text-center">
        <p class="text-gray-400 mb-2">DECLARE WINNER</p>

        <div class="flex gap-4 justify-center">
          <button class="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl">🏆 WALA WINS</button>

          <button class="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-xl">🏆 MERON WINS</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

/* SAMPLE DATA (palitan mo from API) */
const fight = ref({
  number: 1,
  wala: 'Black Thunder',
  meron: 'White Lightning',
  status: 'BETTING OPEN',
})

const totalWala = ref('15,250.00')
const totalMeron = ref('8,750.00')

/* TIMER */
const timer = ref('00:45')

/* ODDS COMPUTE */
const oddsWala = computed(() => {
  return (totalMeron.value / totalWala.value || 1).toFixed(2)
})

const oddsMeron = computed(() => {
  return (totalWala.value / totalMeron.value || 1).toFixed(2)
})
</script>
