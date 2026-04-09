import axios from 'axios'

// Create Axios instance
const api = axios.create({
  // baseURL: 'http://10.151.5.101/api/v1',
  baseURL: '/api/v1', // <-- dito gagamit ng proxy
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')} `,
    'Content-Type': 'application/json',
  },
})

// Attach token dynamically before each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') // get saved token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Optional: automatic refresh (if you implement refresh token)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        // Import refreshToken function from auth.js
        const { refreshToken } = await import('./auth')
        await refreshToken()
        originalRequest.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        return api.request(originalRequest)
      } catch (err) {
        window.location.href = '/login' // redirect to login if refresh fails
      }
    }
    return Promise.reject(error)
  },
)

// Create game
export const createGame = async (data) => {
  const res = await api.post('/games', data)
  return res.data
}

//Create fight
export const createFight = async (data, gameId) => {
  const res = await api.post(`/games/${gameId}/fights`, data)
  return res.data
}

//Get all Games
export const getGames = async () => {
  try {
    const res = await api.get('/games')
    return res.data.items
  } catch (err) {
    console.error('Error fetching games:', err.response?.data || err.message || err)
    return []
  }
}

//Get specific games
export const getGameByCode = async (gameId) => {
  const res = await api.get(`/games/${gameId}`)
  return res.data
}

//Update game status
export const updateGameStatus = async (gameId, status) => {
  const res = await api.patch(`/games/${gameId}`, { gameStatus: status })
  return res.data
}

//Get all fights
export const getFightsByGame = async (gameId) => {
  try {
    const res = await api.get(`/games/${gameId}/fights?status=0`)

    return res.data.items || res.data
  } catch (err) {
    console.error('Error fetching fights:', err)
    throw err
  }
}

export const getFightDetail = async (fightId, gameId) => {
  try {
    const res = await api.get(`/games/${gameId}/fights/${fightId}`)
    return res.data
  } catch (err) {
    console.error(err)
  }
}

export default api
