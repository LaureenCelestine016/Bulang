<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="flex justify-between items-center bg-white/5 backdrop-blur-xl text-white px-6 py-4 border-b border-white/10 shadow-lg"
  >
    <!-- LEFT -->
    <div class="flex items-center gap-4">
      <div class="flex flex-col leading-tight">
        <span class="text-xs text-gray-400 tracking-wide">CONTROLLER PANEL</span>
      </div>

      <span
        class="flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium"
      >
        <span class="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
        LIVE
      </span>
    </div>

    <!-- RIGHT -->
    <div class="flex items-center gap-6 relative">
      <!-- DATE + TIME -->
      <div class="text-right leading-tight">
        <p class="text-sm font-semibold">{{ date }}</p>
        <p class="text-xs text-gray-400">{{ time }}</p>
      </div>

      <!-- USER DROPDOWN -->
      <div class="relative">
        <div
          @click="toggleDropdown"
          class="bg-gradient-to-br from-purple-600 to-indigo-600 w-9 h-9 rounded-full flex items-center justify-center font-semibold shadow-md cursor-pointer"
        >
          AD
        </div>

        <!-- DROPDOWN -->
        <div
          v-if="showDropdown"
          class="absolute right-0 mt-2 w-40 bg-slate-800 border border-white/10 rounded-xl shadow-lg overflow-hidden"
        >
          <button
            @click="logout"
            class="w-full text-left px-4 py-2 text-sm hover:bg-red-500/20 text-red-400"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const time = ref('')
const date = ref('')
const showDropdown = ref(false)

let interval = null

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const logout = () => {
  console.log('Logging out...')
  // 👉 lagay mo dito actual logout logic
  // example:
  // localStorage.clear()
  // router.push('/login')
}

onMounted(() => {
  interval = setInterval(() => {
    const now = new Date()

    date.value = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    time.value = now.toLocaleTimeString()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>
