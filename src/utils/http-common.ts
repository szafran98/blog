import axios from 'axios'
import TokenDataService from '@/services/TokenDataService'

export default axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-type': 'application/json',
    // Authorization: `JWT ${TokenStorageService.getAccessToken()}`
  },
})
/*
axios.interceptors.request.use((config) => {
    const token = TokenDataService.getAccessToken()
    config.headers.Authorization = token ? `JWT ${TokenDataService.getAccessToken()}` : ''
    return config
})


 */
