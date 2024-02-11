import { createStore } from 'vuex'

export default createStore({
  state: {
    statusSelected: 0
  },
  getters: {
    getStatusSelected: (status): number => status.statusSelected
  },
  mutations: {
    setStatusSelected:(status, selected: number) => status.statusSelected = selected
  },
  actions: {
  },
  modules: {
  }
})
