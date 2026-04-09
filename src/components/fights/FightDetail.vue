<template>
  <!-- CARD -->
  <div
    class="bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] rounded-xl p-6 shadow-xl border border-white/10"
  >
    <!-- HEADER -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <p class="text-gray-400 text-sm">Fight Number</p>
        <h1 class="text-3xl font-bold">#{{ fight.fightNo }}</h1>
      </div>

      <div>
        <p class="text-gray-400 text-sm">Status</p>
        <span class="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
          {{ fight.fightStatus }}
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
        <p class="text-gray-300">{{ fight.fightLTName.toUpperCase() }}</p>

        <p class="mt-4 text-sm text-gray-400">TOTAL BETS</p>
        <h1 class="text-2xl font-bold">{{ formatPeso(fight.fightLTParada) }}</h1>

        <p class="text-xs text-gray-400 mt-2">ODDS</p>
        <p class="text-sm">{{ oddsWala }}</p>
      </div>

      <!-- MERON -->
      <div class="bg-red-900/40 p-6 rounded-xl border border-red-500/20 text-center">
        <h2 class="text-xl font-bold text-red-300">MERON</h2>
        <p class="text-gray-300">{{ fight.fightRTName.toUpperCase() }}</p>

        <p class="mt-4 text-sm text-gray-400">TOTAL BETS</p>
        <h1 class="text-2xl font-bold">{{ formatPeso(fight.fightRTParada) }}</h1>

        <p class="text-xs text-gray-400 mt-2">ODDS</p>
        <p class="text-sm">{{ oddsMeron }}</p>
      </div>

      <!-- VS -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div class="bg-black px-4 py-2 rounded-full border border-white/10 text-sm">VS</div>
      </div>
    </div>

    <!-- ACTION BUTTONS (MOVED HERE ✅) -->
    <div class="flex gap-4 mt-6 justify-center">
      <!-- OPEN BETTING -->
      <button
        :disabled="fight.status === 'BETTING OPEN'"
        class="px-6 py-3 rounded-2xl font-semibold text-white shadow-lg transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 hover:shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
        @click="openBetting"
      >
        ▶ OPEN BETTING
      </button>

      <!-- CLOSE BETTING -->
      <button
        :disabled="fight.status !== 'BETTING OPEN'"
        class="px-6 py-3 rounded-2xl font-semibold text-black shadow-lg transition-all duration-300 bg-gradient-to-r from-yellow-500 to-amber-600 hover:scale-105 hover:shadow-yellow-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
        @click="closeBetting"
      >
        🔒 CLOSE BETTING
      </button>
    </div>

    <!-- DECLARE WINNER -->
    <div class="mt-10 text-center">
      <p class="text-gray-400 mb-3 tracking-wide">DECLARE WINNER</p>

      <div class="flex gap-5 justify-center flex-wrap">
        <!-- WALA WIN -->
        <button
          class="px-7 py-3 rounded-2xl font-semibold text-white shadow-lg transition-all duration-300 bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-105 hover:shadow-blue-500/30"
          @click="declareWinner('WALA')"
        >
          🏆 WALA WINS
        </button>

        <!-- MERON WIN -->
        <button
          class="px-7 py-3 rounded-2xl font-semibold text-white shadow-lg transition-all duration-300 bg-gradient-to-r from-red-500 to-rose-600 hover:scale-105 hover:shadow-red-500/30"
          @click="declareWinner('MERON')"
        >
          🏆 MERON WINS
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  fight: Object,
})

const formatPeso = (num) => {
  return '₱ ' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}
</script>
