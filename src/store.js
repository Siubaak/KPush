import Vue from 'vue'
import Vuex from 'vuex'
import { getList } from './api'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
      list: []
    },
    actions: {
      getList({ commit }, query) {
        return getList(query).then(res => commit('setList', res.data))
      }
    },
    mutations: {
      setList(state, list) {
        state.list = list
      }
    }
  })
}