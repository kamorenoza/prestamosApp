export default {
  namespaced: true,

  state: {
    clients: [],
    clientSelected: null,
  },

  mutations: {
    setClients(state, value) {
      state.clients = value;
    },

    setClientSelected(state, value) {
      state.clientSelected = value;
    },
  },
};
