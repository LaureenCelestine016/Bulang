<template>
  <!-- OVERLAY -->
  <div v-if="visible" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" @click="close"></div>

  <!-- SIDEBAR -->
  <div
    class="fixed top-0 right-0 h-full z-50 transform transition-transform duration-300"
    :class="visible ? 'translate-x-0' : 'translate-x-full'"
    style="width: 25vw"
  >
    <div
      class="h-full bg-gradient-to-br from-[#0f172a]/90 via-[#111827]/90 to-[#020617]/90 border-l border-white/10 shadow-2xl p-6 text-white flex flex-col gap-6 overflow-y-auto"
    >
      <!-- HEADER -->
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold">Create Fight</h2>
          <p class="text-sm text-gray-400">{{ game?.gameDescription }}</p>
        </div>

        <button @click="close" class="text-gray-400 hover:text-white text-lg">✕</button>
      </div>

      <form @submit.prevent="submitFight" class="flex flex-col gap-5 my-5">
        <!-- DESCRIPTION -->
        <div>
          <label class="text-xs text-gray-400">Description</label>
          <input
            v-model="description"
            type="text"
            class="w-full mt-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description"
          />
        </div>

        <!-- MERON -->
        <div
          class="bg-gradient-to-br from-red-600/80 via-red-500/70 to-red-400/60 border border-red-400/30 shadow-inner p-4 rounded-xl flex flex-col gap-3 backdrop-blur-md hover:scale-[1.01] transition-transform duration-200 mt-3"
        >
          <!-- Title -->
          <p class="text-red-100 font-semibold bg-red-900/20 px-2 py-1 rounded-md inline-block">
            MERON
          </p>

          <!-- Owner / Team -->
          <input
            v-model="ltName"
            type="text"
            placeholder="Owner / Team"
            class="w-full mt-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-400 backdrop-blur-sm"
          />

          <!-- Parada Amount -->
          <input
            v-model="ltParada"
            type="text"
            placeholder="0.00"
            class="w-full mt-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-400 backdrop-blur-sm"
          />
        </div>

        <!-- WALA -->
        <div
          class="bg-gradient-to-br from-blue-600/80 via-blue-500/70 to-blue-400/60 border border-blue-400/30 shadow-inner p-4 rounded-xl flex flex-col gap-3 backdrop-blur-md hover:scale-[1.01] transition-transform duration-200 mt-3"
        >
          <!-- Title -->
          <p class="text-blue-100 font-semibold bg-blue-900/20 px-2 py-1 rounded-md inline-block">
            WALA
          </p>

          <!-- Owner / Team -->
          <input
            v-model="rtName"
            type="text"
            placeholder="Owner / Team"
            class="w-full mt-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm"
          />

          <!-- Parada Amount -->
          <input
            v-model="rtParada"
            type="text"
            placeholder="0.00"
            class="w-full mt-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm"
          />
        </div>

        <!-- SUMMARY -->
        <div class="bg-white/5 border border-white/10 p-4 rounded-xl text-sm mt-3">
          <p>
            Total Parada:
            <span class="text-yellow-400 font-semibold">₱{{ total }}</span>
          </p>
          <p>
            Lamesa (6%):
            <span class="text-emerald-400 font-semibold">₱{{ tong }}</span>
          </p>
        </div>

        <!-- BUTTON -->
        <Button
          type="submit"
          label="SAVE FIGHT"
          class="bg-emerald-600 hover:bg-emerald-700 border-none rounded-xl mt-5 !text-white"
        />
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import Button from 'primevue/button'

const props = defineProps({
  visible: Boolean,
  game: Object,
})

const emit = defineEmits(['update:visible', 'fight-created'])

const description = ref('')
const ltName = ref('')
const ltParada = ref(0)
const rtName = ref('')
const rtParada = ref(0)

const total = computed(() => (ltParada.value || 0) + (rtParada.value || 0))
const tong = computed(() => total.value * 0.06)

const close = () => emit('update:visible', false)

const submitFight = () => {
  if (!ltName.value || !rtName.value ) {
    alert('Complete required fields')
    return
  }

  emit('fight-created', {
    description: description.value,
    ltName: ltName.value,
    ltParada: ltParada.value,
    rtName: rtName.value,
    rtParada: rtParada.value,
  })

  close()
}
</script>
