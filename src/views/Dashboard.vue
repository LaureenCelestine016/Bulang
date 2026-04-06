<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="p-6 text-white">
    <Toast />

    <!-- HEADER -->
    <h1 class="text-2xl font-semibold mb-2">Game Controller Dashboard</h1>

    <!-- STATUS + CREATE -->
    <div class="mb-6">
      <!-- <StatusCard :status="selectedGame?.gameStatus ?? 'CLOSED'" /> -->

      <button
        v-if="!selectedGame"
        @click="showModal = true"
        class="bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90 px-5 py-2 rounded-xl shadow"
      >
        + CREATE GAME
      </button>
    </div>

    <!-- MODAL -->
    <CreateGameModal :show="showModal" @close="showModal = false" @save="handleSave" />

    <!-- MAIN CARD -->
    <div class="">
      <!-- EMPTY -->
      <EmptyState v-if="!games" />

      <!-- GAME EXIST -->
      <div v-if="!selectedGame" class="flex flex-col gap-4">
        <GameCard v-for="game in games" :key="game.gameCode" :game="game" @manage="startGame" />
      </div>
      <div v-else class="flex flex-col gap-6">
        <!-- HEADER CARD -->
        <div class="bg-slate-900 p-6 rounded-2xl shadow-lg border border-white/5">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-2xl font-bold">{{ selectedGame.gameDescription }}</p>
              <p class="text-gray-400 mt-1">
                {{ formatDate(selectedGame.registeredAt) }}
              </p>
            </div>

            <button
              @click="selectedGame = null"
              class="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-xl"
            >
              ← Back
            </button>
          </div>
        </div>

        <!-- ACTION CARD -->
        <div class="bg-slate-900 p-5 rounded-2xl shadow border border-white/5 flex gap-3">
          <button
            @click="sidebarVisible = true"
            class="bg-emerald-600 hover:bg-emerald-700 px-5 py-2 rounded-xl shadow"
          >
            + CREATE FIGHT
          </button>

          <button
            @click="closeGame"
            class="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl shadow"
          >
            CLOSE GAME
          </button>
        </div>

        <CreateFightSidebar
          :visible="sidebarVisible"
          :game="selectedGame"
          @update:visible="sidebarVisible = $event"
          @fight-created="handleFightCreated"
        />
        <!-- FIGHTS CARD -->
        <div class="bg-slate-900 p-6 rounded-2xl shadow border border-white/5">
          <!-- EMPTY -->
          <div v-if="fights.length === 0" class="text-gray-400 text-center py-6">No fights yet</div>

          <!-- LIST -->
          <div v-else class="flex flex-col gap-3">
            <div
              v-for="fight in fights"
              :key="fight.id"
              class="bg-slate-800 p-4 rounded-xl flex justify-between items-center hover:bg-slate-700 transition"
            >
              <div>
                <p class="font-bold">Fight #{{ fight.number }}</p>
                <p class="text-sm text-gray-400">{{ fight.wala }} vs {{ fight.meron }}</p>
              </div>

              <span
                class="text-xs px-3 py-1 rounded-full"
                :class="{
                  'bg-yellow-500/20 text-yellow-400': fight.status === 'PENDING',
                  'bg-green-500/20 text-green-400': fight.status === 'OPEN',
                  'bg-red-500/20 text-red-400': fight.status === 'CLOSED',
                }"
              >
                {{ fight.status }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import EmptyState from '@/components/dashboard/EmptyState.vue'
import CreateGameModal from '@/components/modals/CreateGameModal.vue'
import GameCard from '@/components/dashboard/GameCard.vue'
import CreateFightSidebar from '@/components/dashboard/CreateFightSidebar.vue'
import Toast from 'primevue/toast'

import {
  createGame,
  updateGameStatus,
  getGameByCode,
  getGames,
  getFightsByGame,
} from '@/services/api'
import { useToast } from 'primevue/usetoast'
import { ref, onMounted } from 'vue'

const toast = useToast()

/* =========================
   STATE
========================= */
const showModal = ref(false)
const sidebarVisible = ref(false)
const games = ref([])
const selectedGame = ref(null) // ✅ selected for Manage
const fights = ref([])
const loading = ref(false)
const fightsLoading = ref(false)

/* =========================
   CREATE GAME
========================= */
const handleSave = async (data) => {
  try {
    const res = await createGame(data)
    selectedGame.value = res.data

    toast.add({
      severity: 'success',
      summary: 'Game Created',
      detail: 'Game successfully created!',
      life: 3000,
    })

    showModal.value = false
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.message || error,
      life: 3000,
    })
  }
}

const handleFightCreated = () => {}

const loadGames = async () => {
  try {
    games.value = await getGames()
  } catch (err) {
    console.error(err)
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to load games', life: 3000 })
  }
}
loadGames()

/* =========================
   MANAGE GAME
========================= */
const startGame = async (gameCode) => {
  loading.value = true

  try {
    // 1️⃣ Load specific game
    const gameData = await getGameByCode(gameCode)
    selectedGame.value = gameData

    // 2️⃣ Optimistic update: update the game in games array so GameCard updates immediately
    const index = games.value.findIndex((g) => g.gameCode === gameCode)
    if (index !== -1) {
      games.value[index] = { ...games.value[index], gameStatus: 1 } // triggers reactivity
    }

    // 3️⃣ Update backend (non-blocking)
    updateGameStatus(gameCode, 1).catch((err) => {
      console.error('Status update failed', err)
      // Optional rollback if API fails
      if (index !== -1) {
        games.value[index] = { ...games.value[index], gameStatus: 0 }
      }
    })

    // 4️⃣ Lazy load fights
    fightsLoading.value = true
    getFightsByGame(gameCode)
      .then((data) => (fights.value = data))
      .finally(() => (fightsLoading.value = false))

    // 5️⃣ Toast
    toast.add({
      severity: 'success',
      summary: 'Game Started',
      detail: 'Fights are loading...',
      life: 2000,
    })
  } catch (err) {
    console.error(err)
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to start game', life: 3000 })
  } finally {
    loading.value = false
  }
}

/* =========================
   FORMAT DATE
========================= */
const formatDate = (iso) => {
  if (!iso) return ''
  return new Date(iso).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>
