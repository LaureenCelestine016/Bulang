<template>
  <div
    class="bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] rounded-xl p-6 shadow-xl border border-white/10"
  >
    <!-- Header -->
    <div class="mb-4">
      <h1 class="text-white text-lg font-semibold">Trends</h1>
    </div>

    <!-- Trend Board -->
    <div class="flex gap-2 overflow-x-auto">
      <div v-for="(column, colIndex) in columns" :key="colIndex" class="flex flex-col gap-1">
        <div
          v-for="(cell, rowIndex) in column"
          :key="rowIndex"
          class="w-8 h-8 flex items-center justify-center text-xs rounded-md border border-gray-700"
          :class="getCellClass(cell)"
        >
          {{ cell?.value || '' }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

// sample raw results (replace with API)
const results = ref([
  { type: 'red', value: 4 },
  { type: 'red', value: 25 },
  { type: 'blue', value: 28 },
  { type: 'red', value: 7 },
  { type: 'blue', value: 25 },
  { type: 'blue', value: 20 },
])

// build columns (key logic 🔥)
const columns = ref([])
let currentColumn = []

results.value.forEach((item, index) => {
  if (index === 0) {
    currentColumn.push(item)
  } else {
    const prev = results.value[index - 1]

    if (item.type === prev.type) {
      currentColumn.push(item) // same color = stack down
    } else {
      columns.value.push(currentColumn) // new column
      currentColumn = [item]
    }
  }
})

// push last column
if (currentColumn.length) {
  columns.value.push(currentColumn)
}

// styles
const getCellClass = (cell) => {
  if (!cell) return ''

  return {
    'bg-red-500 text-white': cell.type === 'red',
    'bg-blue-500 text-white': cell.type === 'blue',
    'bg-yellow-400 text-black': cell.type === 'draw',
  }
}
</script>
