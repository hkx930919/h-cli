export default {
  namespaced: true,
  state: {
    count: 0
  },
  getters: {},
  mutations: {
    increment(state) {
      state.count++
    },
    subtract(state) {
      state.count--
    }
  },
  actions: {}
}
