import Vue from "vue";
import Vuex from "vuex";
import homeStore from "@/home/context/homeStore";
import settingsStore from "@/settings/context/settingsStore";
import clientsStore from "@/clients/context/clientsStore";
import loansStore from "@/loans/context/loansStore";
import earningsStore from "@/earnings/context/earningsStore";
import dailyExpensesStore from "@/dailyExpenses/context/dailyExpensesStore";
import loginStore from "@/login/context/loginStore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    homeStore,
    settingsStore,
    clientsStore,
    loansStore,
    earningsStore,
    dailyExpensesStore,
    loginStore
  },
});
