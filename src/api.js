import axios from 'axios'
import progress from 'nprogress'

export function getList(query) {
  progress.start()
  return axios.get('/api/search', { params: { query } })
    .then(res => {
      progress.done()
      return res
    })
}

export function getUrls(id) {
  progress.start()
  return axios.get('/api/urls', { params: { id } })
    .then(res => {
      progress.done()
      return res
    })
}

export function push(url) {
  progress.start()
  return axios.get('/api/push', { params: { url } })
    .then(res => {
      progress.done()
      return res
    })
}