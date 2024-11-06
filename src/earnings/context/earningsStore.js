import moment from "moment";
import { TYPE_MAXI } from "@/shared/constants";

export default {
  namespaced: true,

  state: {
    currentPeriod: moment().format('YYYY-MM-DD'),
    filterSelected: TYPE_MAXI,
  },

  mutations: {
    setCurrentPeriod (state, value) {
      state.currentPeriod = value
    },

    setFilterSelected(state, value) {
      state.filterSelected = value;
    }
  }
}
