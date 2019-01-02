import Vue from 'vue'
import Vuex from 'vuex'
import { getList } from './api'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
      result: {}
    },
    actions: {
      getList({ commit }, query) {
        return getList(query).then(res => commit('setList', { fail: false, list: res.data }))
          .catch(() => commit('setList', { fail: true, list: [] }))
      }
    },
    mutations: {
      setList(state, result) {
        state.result = result
      }
    }
  })
}