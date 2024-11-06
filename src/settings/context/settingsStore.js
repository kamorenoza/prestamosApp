export default {
  namespaced: true,

  state: {
    email: null,
    settings: null,
  },

  mutations: {
    setEmail(state, value) {
      state.email = value;
    },

    setSettings(state, value) {
      state.settings = value;
    },
  },
};
