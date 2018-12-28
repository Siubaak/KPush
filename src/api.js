import axios from 'axios'

export function getList(query) {
  return axios.get('http://localhost:7001/api/search', { params: { query } })
}

export function getUrls(id) {
  return axios.get('http://localhost:7001/api/urls', { params: { id } })
}

export function push(url) {
  return axios.get('http://localhost:7001/api/push', { params: { url } })
}