import axios from 'axios'
import config from '../config'
import { createApp } from './main'

if (process.env.APP_ENV === 'dev') {
  axios.defaults.baseURL = 'http://localhost:8081'
} else {
  axios.defaults.baseURL = `http://${config.host}:${config.port}`
}

export default ctx => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    router.push(ctx.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        ctx.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}