import { createApp } from 'vue'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'
import ToastService from 'primevue/toastservice'

import '@/assets/main.css'
import router from '@/router'
import App from '@/App.vue'

const app = createApp(App)

app.use(router)
app.use(ToastService)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

app.mount('#app')
