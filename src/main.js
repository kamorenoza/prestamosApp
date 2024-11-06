import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import { FontAwesomeIcon } from "@/assets/icons";
import VueSweetalert2 from "vue-sweetalert2";
import filters from '@/shared/filters'

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "@/assets/scss/main.scss";
import "sweetalert2/dist/sweetalert2.min.css";
import directives from "@/shared/directives";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.component("f-icon", FontAwesomeIcon);
Vue.use(VueSweetalert2)
Vue.use(filters)
Vue.use(directives)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
