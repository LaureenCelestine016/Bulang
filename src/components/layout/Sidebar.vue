<template>
  <div
    class="h-screen w-64 bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#020617] text-gray-300 p-4 flex flex-col justify-between border-r border-gray-800"
  >
    <div>
      <h1 class="text-xl font-bold mb-6 text-white">🐓 SABONG</h1>
      <ul class="space-y-3">
        <li class="hover:text-blue-400 cursor-pointer">Dashboard</li>
        <li class="hover:text-blue-400 cursor-pointer">Fights</li>
        <li class="hover:text-blue-400 cursor-pointer">Betting History</li>
        <li class="hover:text-blue-400 cursor-pointer">Reports</li>
        <li class="hover:text-blue-400 cursor-pointer">Settings</li>
      </ul>
    </div>

    <div class="bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10">
      <p class="text-xs mb-2 text-gray-400">Quick Actions</p>
      <button class="w-full mb-2 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg">
        + Create Game
      </button>
      <button class="w-full mb-2 bg-green-600 hover:bg-green-700 py-2 rounded-lg">Open Game</button>
      <button class="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg">Close Game</button>
    </div>
  </div>
</template>
