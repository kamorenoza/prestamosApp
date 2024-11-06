import moment from "moment"

export default {
  namespaced: true,

  state: {
    currentPeriod: moment().format('YYYY-MM-DD'),
    expenses: [],
    expenseSelected: null
  },

  mutations: {
    setCurrentPeriod (state, value) {
      state.currentPeriod = value
    },

    setExpenses (state, value) {
      state.expenses = value
    },

    setExpenseSelected (state, value) {
      state.expenseSelected = value
    }
  }
}
