import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home'
import Search from './pages/Search'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', component: Home },
      { path: '/search', component: Search }
    ]
  })
}
