// src/services/auth.js
import axios from 'axios'

const authApi = axios.create({
  // baseURL: 'http://10.151.5.101/api/v1',
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json' },
})

export const login = async (credentials) => {
  const res = await authApi.post('/auth/login', credentials)

  // Save tokens
  localStorage.setItem('token', res.data.bearer)
  localStorage.setItem('refresh_token', res.data.refresher)

  return res.data
}

export const refreshToken = async () => {
  const refresh_token = localStorage.getItem('refresh_token')
  if (!refresh_token) throw new Error('No refresh token found')

  const res = await authApi.post(
    '/auth/refresh',
    {},
    { headers: { Authorization: `Bearer ${refresh_token}` } },
  )

  // Update tokens
  localStorage.setItem('token', res.data.access_token)
  if (res.data.refresh_token) localStorage.setItem('refresh_token', res.data.refresh_token)

  return res.data
}
