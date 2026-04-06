<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login-wrapper">
    <Toast />
    <!-- LOGIN CARD -->
    <div class="login-card">
      <!-- LOGO / TITLE -->
      <div class="text-center mb-4">
        <h1 class="title">🐓 SABONG</h1>
      </div>

      <!-- FORM -->
      <div class="flex flex-col gap-3">
        <InputText v-model="username" placeholder="Username" class="w-full" />

        <Password
          v-model="password"
          placeholder="Password"
          toggleMask
          class="w-full"
          inputClass="w-full"
        />

        <Button label="Login" icon="pi pi-sign-in" class="w-full" @click="handleLogin" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/services/auth'

import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const username = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    const tokenData = await login({
      username: username.value,
      password: password.value,
      address: '0.0.0.0',
      hostname: 'string',
    })

    // Store token in localStorage
    localStorage.setItem('token', tokenData.bearer)
    router.push('/dashboard')

    toast.add({ severity: 'success', summary: 'Login Success', detail: 'Welcome!', life: 3000 })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Login Failed',
      detail: error.message || error,
      life: 3000,
    })
  }
}

// const loginUser = () => {
//   if (!username.value || !password.value) {
//     error.value = 'Please enter username and password'
//     return
//   }

//   if (username.value === 'admin' && password.value === '1234') {
//     toast.add({
//       severity: 'success',
//       summary: 'Success Message',
//       detail: 'Login Successfully',
//       life: 3000,
//     })
//     router.push('/dashboard')
//   } else {
//     error.value = 'Invalid credentials'
//   }
// }
</script>

<style scoped>
.login-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0f172a;
}

.login-card {
  background: #1e293b;
  padding: 30px;
  border-radius: 12px;
  width: 350px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.title {
  color: #fff;
  font-weight: bold;
  font-size: 24px;
}

.subtitle {
  color: #94a3b8;
}

.error {
  color: #f87171;
  margin-top: 10px;
  text-align: center;
}
</style>
