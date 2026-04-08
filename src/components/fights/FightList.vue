<template>
  <div class="text-white">
    <!-- MAIN CARD -->
    <div class="bg-slate-900 p-6 rounded-xl shadow border border-white/5">
      <!-- HEADER -->
      <div class="mb-6">
        <div>
          <h1 class="text-2xl font-semibold">Fight List</h1>
          <p class="text-gray-400 text-sm mt-1">Manage and monitor all fights</p>
        </div>
      </div>

      <!-- TABLE -->
      <div class="overflow-hidden rounded-lg border border-white/5">
        <table class="w-full text-sm text-left">
          <!-- HEAD -->
          <thead class="bg-slate-800 text-gray-400 text-xs uppercase">
            <tr>
              <th class="px-4 py-3">Fight #</th>
              <th class="px-4 py-3">Description</th>
              <th class="px-4 py-3">Date</th>
              <th class="px-4 py-3">Wala</th>
              <th class="px-4 py-3">Meron</th>
              <th class="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>

          <!-- BODY -->
          <tbody class="text-gray-300">
            <tr
              v-for="fight in fights"
              :key="fight.id"
              class="border-t border-white/5 hover:bg-white/5 transition"
            >
              <td class="px-4 py-3 font-medium text-white">
                {{ fight.fightNo }}
              </td>

              <td class="px-4 py-3 font-medium text-white">
                {{ fight.fightDescription }}
              </td>

              <td class="px-4 py-3 text-gray-400">
                {{ formatDate(fight.fightStart) }}
              </td>

              <td class="px-4 py-3">{{ fight.fightLTName }}</td>
              <td class="px-4 py-3">{{ fight.fightRTName }}</td>

              <td class="px-4 py-3 text-center">
                <span
                  :class="statusClass(fight.fightStatus)"
                  class="px-3 py-1 text-xs rounded-full font-medium"
                >
                  {{ fight.fightStatus }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- EMPTY -->
      <div v-if="!fights.length" class="text-center text-gray-400 mt-6">No fights available</div>
    </div>
  </div>
</template>

<script setup>
const formatDate = (date) => {
  const d = new Date(date)

  const options = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }

  const datePart = d.toLocaleDateString('en-US', options)

  let hours = d.getHours()
  const minutes = d.getMinutes().toString().padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'

  hours = hours % 12 || 12 // convert to 12-hour
  hours = hours.toString().padStart(2, '0')

  return `${datePart} ${hours}:${minutes} ${ampm}`
}

const statusClass = (status) => {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-500/20 text-yellow-400'
    case 'Ongoing':
      return 'bg-green-500/20 text-green-400'
    case 'Finished':
      return 'bg-red-500/20 text-red-400'
    default:
      return 'bg-gray-500/20 text-gray-400'
  }
}

defineProps({
  fights: Array,
})
</script>
