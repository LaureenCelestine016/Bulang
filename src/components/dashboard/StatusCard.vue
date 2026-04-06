<template>
  <div
    class="bg-white/5 backdrop-blur-md text-white p-4 rounded-xl w-64 border border-white/10 shadow-lg"
  >
    <p class="text-xs text-gray-400">STATUS</p>
    <div class="flex items-center gap-2 mt-2">
      <span
        class="w-2 h-2 rounded-full animate-pulse"
        :class="{
          'bg-red-500': status === 'CLOSED',
          'bg-yellow-500': status.includes('PENDING'),
          'bg-green-500': status.includes('OPEN'),
        }"
      ></span>
      <span>{{ status }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: { type: String, default: 'CLOSED' },
  },
}
</script>
