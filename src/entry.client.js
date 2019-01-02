import axios from 'axios'
import progress from 'nprogress'
import { createApp } from './main'

progress.configure({ showSpinner: false })

axios.interceptors.request.use(config => {
  progress.start()
  return config
}, error => {
  progress.done()
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  progress.done()
  return response
}, error => {
  progress.done()
  return Promise.reject(error)
})

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    progress.start()

    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })

    if (!activated.length) {
      return next()
    }

    Promise.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({ store, route: to })
      }
    })).then(next).catch(next)
  })

  router.afterEach(() => progress.done())

  app.$mount('#app')
})
