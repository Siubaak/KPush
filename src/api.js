import axios from 'axios'

export function getList(query) {
  return axios.get('/api/search', { params: { query } })
}

export function getUrls(id) {
  return axios.get('/api/urls', { params: { id } })
}

export function push(url) {
  return axios.get('/api/push', { params: { url } })
}