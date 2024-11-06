export default {
  namespaced: true,

  state: {
    user: ''
  },

  mutations: {
    setEmail (state, value) {
      state.user = value
    }
  }
}
