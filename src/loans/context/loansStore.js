import { TYPE_MAXI } from "@/shared/constants";

export default {
  namespaced: true,

  state: {
    loans: {},
    loanSelected: null,
    backRoute: '/loans',
    backMainRoute: '/loans',
    fees: [],
    total: '',
    numPaid: '',
    feeSelected: null,
    filterSelected: TYPE_MAXI,
  },

  mutations: {
    setLoans(state, value) {
      state.loans = value;
    },

    setLoanSelected(state, value) {
      state.loanSelected = value;
    },

    setBackRoute(state, value) {
      state.backRoute = value;
    },

    setBackMainRoute(state, value) {
      state.backMainRoute = value;
    },

    setFees (state, { fees, total, numPaid }) {
      state.fees = fees
      state.total = total
      state.numPaid = numPaid
    },

    setFeeSelected(state, value) {
      state.feeSelected = value;
    },

    setFilterSelected(state, value) {
      state.filterSelected = value;
    },
  }
}
