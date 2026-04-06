<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <!-- Modal -->
    <div
      class="w-full max-w-lg bg-gradient-to-br from-[#0f172a]/90 via-[#111827]/90 to-[#020617]/90 border border-white/10 rounded-2xl shadow-2xl p-6 text-white"
    >
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold tracking-wide">CREATE GAME</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-white text-xl">✕</button>
      </div>

      <!-- Form -->
      <div class="space-y-4">
        <!-- Game Name -->
        <div>
          <label class="text-sm text-gray-400">Game Name</label>
          <input
            v-model="form.gameDescription"
            type="text"
            class="w-full mt-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter game name"
          />
        </div>

        <!-- Schedule -->
        <div>
          <label class="text-sm text-gray-400">Schedule</label>
          <div class="relative mt-1">
            <input
              v-model="form.startDate"
              type="datetime-local"
              class="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span class="absolute right-3 top-2.5 text-green-400">📅</span>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end gap-3 mt-8">
        <button
          @click="$emit('close')"
          class="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
        >
          CANCEL
        </button>

        <button
          @click="submit"
          class="px-6 py-2 rounded-lg bg-gradient-to-r from-green-600 to-green-500 hover:opacity-90 flex items-center gap-2"
        >
          ✔ SAVE
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

defineProps({
  show: Boolean,
})

const emit = defineEmits(['close', 'save'])

const form = reactive({
  gameDescription: '',
  startDate: '',
})

const submit = () => {
  emit('save', form)
}
</script>
