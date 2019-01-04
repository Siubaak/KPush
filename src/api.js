import axios from 'axios'

export function getList(query) {
  return axios.get('/api/search', { params: { query } })
}

export function push(url) {
  return axios.post('/api/push', { url })
}