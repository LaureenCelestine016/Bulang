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
    <CreateGameModal :show="showModal" @close="showModal = false" @save="handleGameCreated" />

    <!-- MAIN CARD -->
    <div class="">
      <!-- EMPTY -->
      <EmptyState v-if="!games?.length" />

      <div v-else>
        <div v-if="!selectedGame" class="flex flex-col gap-4">
          <GameCard v-for="game in games" :key="game.gameCode" :game="game" @manage="startGame" />
        </div>
        <div v-else class="flex flex-col gap-6">
          <!-- HEADER CARD -->
          <div class="bg-slate-900 p-6 rounded-2xl shadow-lg border border-white/5">
            <div class="flex justify-between items-center">
              <div class="flex justify-center item gap-10">
                <div>
                  <p class="text-2xl font-bold">{{ selectedGame.gameDescription }}</p>
                  <p class="text-gray-400 mt-1">
                    {{ formatDate(selectedGame.registeredAt) }}
                  </p>
                </div>

                <!--ACTION BUTTON -->
                <div class="flex gap-3 mt-3">
                  <button
                    @click="sidebarVisible = true"
                    class="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-xl shadow"
                  >
                    + CREATE FIGHT
                  </button>

                  <button
                    @click="closeGame"
                    class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl shadow"
                  >
                    CLOSE GAME
                  </button>
                </div>
              </div>

              <button
                @click="selectedGame = null"
                class="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-xl"
              >
                ← Back
              </button>
            </div>
          </div>

          <CreateFightSidebar
            :visible="sidebarVisible"
            :game="selectedGame"
            @update:visible="sidebarVisible = $event"
            @fight-created="handleFightCreated"
          />

          <!-- FIGHTS CARD -->
          <div class="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-4">
            <!-- Top Left -->
            <div class="md:col-span-8 md:row-start-1">
              <EmptyState
                v-if="!selectedFight"
                title="No active fight"
                description="Please create a fight to start."
                icon="🥊"
              />
              <FightDetail
                v-else
                :fight="selectedFight"
                @select-open-betting="updateFight"
                @select-winner="updateWinner"
              />
            </div>

            <!-- Right (same height as top only) -->
            <div class="md:col-span-4 md:row-start-1"><FightBet /></div>

            <!-- Bottom Left -->
            <div class="md:col-span-12 md:row-start-2">
              <FightList :fights="fights" @selectFight="fetchFightDetail" />
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
import FightDetail from '@/components/fights/FightDetail.vue'
import FightList from '@/components/fights/FightList.vue'
import FightBet from '@/components/fights/FightBet.vue'
import Toast from 'primevue/toast'

import {
  createGame,
  createFight,
  updateGameStatus,
  getGameByCode,
  getGames,
  getFightsByGame,
  getFightDetail,
  updateFightStatus,
  updateFightWinner,
} from '@/services/api'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'

const toast = useToast()

/* =========================
   STATE
========================= */
const showModal = ref(false)
const sidebarVisible = ref(false)
const selectedGame = ref(null)
const selectedFight = ref(null)
const loading = ref(false)
const fightsLoading = ref(false)
const games = ref([])
const fights = ref([])

/* =========================
   CREATE GAME
========================= */
const handleGameCreated = async (data) => {
  try {
    const res = await createGame(data)
    console.log(res)

    games.value.push(res)

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

/* =========================
   Create Fight
========================= */
const handleFightCreated = async (data) => {
  try {
    const res = await createFight(data, selectedGame.value.gameCode)
    fights.value.push(res)

    toast.add({
      severity: 'success',
      summary: 'Fight Created',
      detail: 'Fight successfully created!',
      life: 3000,
    })
  } catch (error) {
    console.log(error)

    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.message || error,
      life: 3000,
    })
  }
}

/* =========================
   Fetch All Games
========================= */

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
   Fetch Fight Details
========================= */
const fetchFightDetail = async (fightId) => {
  try {
    const res = await getFightDetail(fightId, selectedGame.value.gameCode)
    selectedFight.value = res
  } catch (err) {
    console.log(err)
  }
}

/* =========================
   MANAGE GAME
========================= */
const startGame = async (gameCode, status = null) => {
  loading.value = true
  selectedFight.value = null
  try {
    // 1️⃣ Load specific game
    const gameData = await getGameByCode(gameCode)
    selectedGame.value = gameData

    // 👉 ONLY update if may status
    if (status !== null) {
      const index = games.value.findIndex((g) => g.gameCode === gameCode)
      if (index !== -1) {
        games.value[index] = { ...games.value[index], gameStatus: status }
      }

      updateGameStatus(gameCode, status).catch((err) => {
        console.error('Status update failed', err)

        // rollback
        if (index !== -1) {
          games.value[index] = { ...games.value[index], gameStatus: 0 }
        }
      })
    }

    // Load fights
    fightsLoading.value = true
    getFightsByGame(gameCode)
      .then((data) => {
        fights.value = data
      })
      .catch((err) => {
        console.error('ERROR:', err)
      })
      .finally(() => {
        fightsLoading.value = false
      })

    // Toast
    toast.add({
      severity: 'success',
      summary: status ? 'Game Started' : 'Viewing Game',
      detail: 'Fights are loading...',
      life: 2000,
    })
  } catch (err) {
    console.error(err)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to load game',
      life: 3000,
    })
  } finally {
    loading.value = false
  }
}

/* =========================
   Update Fight Status
========================= */

const updateFight = async (fightId) => {
  try {
    const res = await updateFightStatus(selectedGame.value.gameCode, fightId, 1)
    selectedFight.value = res
  } catch (err) {
    console.log(err)
  }
}

const updateWinner = async (status) => {
  try {
    const res = await updateFightWinner(selectedGame.value.gameCode, status)

    selectedFight.value = res
  } catch (err) {
    console.log(err)
  }
}

// const remainingTime = ref('')

/* =========================
   FORMAT DATE
========================= */
const formatDate = (iso) => {
  if (!iso) return ''

  return new Date(iso + 'Z')
    .toLocaleString('en-PH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
    .replace(' at ', ' ')
}
</script>
