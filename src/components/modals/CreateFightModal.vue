<template>
  <Dialog
    v-model:visible="visible"
    header="Create Fight"
    :modal="true"
    :style="{ width: '600px' }"
    class="rounded-xl"
  >
    <div class="flex flex-col gap-4">
      <!-- Team Names -->
      <InputText
        v-model="wala"
        placeholder="Wala Team Name"
        class="w-full border rounded-lg px-3 py-2"
      />
      <InputText
        v-model="meron"
        placeholder="Meron Team Name"
        class="w-full border rounded-lg px-3 py-2"
      />

      <!-- Betting Time -->
      <Calendar
        v-model="bettingTime"
        showIcon
        placeholder="Select Betting Time"
        class="w-full border rounded-lg px-3 py-2"
        showTime
        hourFormat="24"
      />

      <!-- Initial Bets -->
      <InputNumber
        v-model="walaBet"
        placeholder="Wala Bet"
        class="w-full"
        mode="currency"
        currency="PHP"
        locale="ph-PH"
      />
      <InputNumber
        v-model="meronBet"
        placeholder="Meron Bet"
        class="w-full"
        mode="currency"
        currency="PHP"
        locale="ph-PH"
      />

      <!-- Status Dropdown -->
      <Dropdown
        v-model="status"
        :options="statusOptions"
        optionLabel="label"
        optionValue="value"
        placeholder="Select Status"
        class="w-full"
      />
    </div>

    <template #footer>
      <div class="flex justify-end gap-2">
        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="closeModal" />
        <Button
          label="Create"
          icon="pi pi-check"
          class="p-button-success"
          @click="createFight"
          :disabled="!canSubmit"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Calendar from 'primevue/calendar'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'

const props = defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue', 'fightCreated'])

const visible = ref(props.modelValue)
watch(
  () => props.modelValue,
  (val) => (visible.value = val),
)
watch(visible, (val) => emit('update:modelValue', val))

// Form fields
const wala = ref('')
const meron = ref('')
const bettingTime = ref(null)
const walaBet = ref(0)
const meronBet = ref(0)
const status = ref(0)

const statusOptions = [
  { label: 'New', value: 0 },
  { label: 'Open Bet', value: 1 },
  { label: 'Completed', value: 2 },
  { label: 'Cancelled', value: 3 },
]

// Validation
const canSubmit = computed(() => {
  return wala.value && meron.value && bettingTime.value != null
})

// Methods
const closeModal = () => {
  visible.value = false
}

const createFight = () => {
  const guid = crypto.randomUUID()

  const fightData = {
    guid,
    wala: wala.value,
    meron: meron.value,
    bettingTime: bettingTime.value,
    walaBet: walaBet.value,
    meronBet: meronBet.value,
    winner: 0, // default none
    status: status.value,
  }

  emit('fightCreated', fightData)

  // Reset form
  wala.value = ''
  meron.value = ''
  bettingTime.value = null
  walaBet.value = 0
  meronBet.value = 0
  status.value = 0
  visible.value = false
}
</script>
