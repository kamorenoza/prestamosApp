<template>
  <div>
    <b-button :disabled="!settings" class="button-menu" v-b-toggle.sidebar-1>
      <b-icon icon="list" />
    </b-button>
    <b-button class="button-menu-settings" @click="goToSettings()">
      <b-icon icon="gear" />
    </b-button>
    <b-sidebar class="o-menu" id="sidebar-1" title="" shadow backdrop>
      <div>
        <div v-if="settings" class="pl-3 title-menu">
          <p class="o-menu__name">{{ settings.name }}</p>
          <p class="o-menu__email">{{ settings.email }}</p>
        </div>
        <b-nav vertical>
          <router-link class="menu-item" :class="addClass('/')" to="/">
            <f-icon icon="fa-hand-holding-dollar" />
            <p>Inicio</p>
          </router-link>

          <router-link
            class="menu-item"
            :class="addClass('/loans')"
            to="/loans"
          >
            <f-icon icon="fa-sack-dollar" />
            <p>Préstamos</p>
          </router-link>
          <router-link
            class="menu-item"
            :class="addClass('/clients')"
            to="/clients"
          >
            <f-icon icon="fa-user-group" />
            <p>Clientes</p>
          </router-link>
          <router-link
            class="menu-item"
            :class="addClass('/earnings')"
            to="/earnings"
          >
            <f-icon icon="fa-money-bill-trend-up" />
            <p>Ganancias</p>
          </router-link>
          <router-link
            class="menu-item"
            :class="addClass('/dailyExpenses')"
            to="/dailyExpenses"
          >
            <f-icon icon="fa-circle-down" />
            <p>Gastos diarios</p>
          </router-link>
        </b-nav>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "NavbarMenu",

  computed: {
    ...mapState("settingsStore", ["settings"]),
  },

  methods: {
    addClass(menu) {
      let route = "";
      if (!this.$route.path) route = window.location.pathname;
      else route = this.$route.path;

      return route === menu ? "selected" : "";
    },

    goToSettings() {
      if (this.$router.name !== "settings") this.$router.push("/settings");
    },
  },
};
</script>
