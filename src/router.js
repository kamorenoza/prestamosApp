import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(
        /* webpackChunkName: "home" */ "@/home/context/views/HomeView.vue"
      ),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(
        /* webpackChunkName: "login" */ "@/login/context/views/LoginView.vue"
        ),
  },
  {
    path: "/settings",
    name: "settings",
    component: () =>
      import(
        /* webpackChunkName: "settings" */ "@/settings/context/views/SettingsView.vue"
      ),
  },
  {
    path: "/clients",
    name: "clients",
    component: () =>
      import(
        /* webpackChunkName: "clients" */ "@/clients/context/views/ClientsView.vue"
      ),
  },
  {
    path: "/save-client",
    name: "save-client",
    component: () =>
      import(
        /* webpackChunkName: "save-client" */ "@/clients/context/views/SaveClient.vue"
      ),
  },
  {
    path: "/detail-client",
    name: "detail-client",
    component: () =>
      import(
        /* webpackChunkName: "detail-client" */ "@/clients/context/views/DetailClientView.vue"
      ),
  },
  {
    path: "/save-loan",
    name: "save-loan",
    component: () =>
      import(
        /* webpackChunkName: "save-loan" */ "@/loans/context/views/SaveLoan.vue"
      ),
  },
  {
    path: "/loans-client",
    name: "loans-client",
    component: () =>
      import(
        /* webpackChunkName: "loans-client" */ "@/loans/context/views/LoansByClient.vue"
      ),
  },
  {
    path: "/detail-loan",
    name: "detail-loan",
    component: () =>
      import(
        /* webpackChunkName: "detail-loan" */ "@/loans/context/views/DetailLoan.vue"
      ),
  },
  {
    path: "/loans",
    name: "loans",
    component: () =>
      import(
        /* webpackChunkName: "loans" */ "@/loans/context/views/LoansView.vue"
        ),
  },
  {
    path: "/earnings",
    name: "earnings",
    component: () =>
      import(
        /* webpackChunkName: "earnings" */ "@/earnings/context/views/EarningsView"
        ),
  },
  {
    path: "/dailyExpenses",
    name: "dailyExpenses",
    component: () =>
      import(
        /* webpackChunkName: "dailyExpenses" */ "@/dailyExpenses/context/views/DailyExpensesView"
        ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const loanSelected = store.state.loansStore.loanSelected
  const clientSelected = store.state.clientsStore.clientSelected

  if (to.name === 'detail-loan') {
    if (!loanSelected) next('/loans')
    else next()
  }

  else if (to.name === 'detail-client') {
    if (!clientSelected) next('/clients')
    else next()
  }

  else if (to.name === 'save-loan') {
    if (!clientSelected) next('/clients')
    else next()
  }

  else if (to.name === 'loans-client') {
    if (!clientSelected) next('/clients')
    else next()
  }

  else next()
})

export default router;
