<template>
  <div>
    <title-general title="Configuración" />

    <content-general buttonText="Guardar" :buttonAction="save">
      <div>
        <input-general
          v-model="email"
          :validate="validate"
          label="Email"
          icon="fa-envelope"
          is-email
          disabled
        />
        <input-general
          v-model="name"
          :validate="validate"
          label="Nombre completo"
          icon="fa-user-group"
        />
        <input-general
          v-model="maxi"
          :validate="validate"
          label="Créditos maxi"
          icon="fa-money-bill-trend-up"
          is-number
        />
        <div @click="doBackup()" class="mt-4 border-top pt-3">
          <p>
            <b-icon icon="save" class="mr-1" />
            Hacer copia de seguridad
          </p>
        </div>
        <div @click="logout()" class="mt-4 border-top pt-3 border-bottom pb-4">
          <p>
            <b-icon icon="box-arrow-in-left" class="mr-1" />
            Cerrar sesión
          </p>
        </div>
      </div>
    </content-general>
  </div>
</template>

<script>
import TitleGeneral from "@/shared/components/TitleGeneral.vue";
import ContentGeneral from "@/shared/components/ContentGeneral.vue";
import InputGeneral from "@/shared/components/InputGeneral.vue";
import SettingsUc from "@/settings/usecases/settingsUc";
import { mapMutations, mapState } from "vuex";
import { utils } from "@/shared/utils";
import { notification } from "@/shared/notification";
import BackupUc from "@/login/usecases/backupUc";

export default {
  components: {
    TitleGeneral,
    ContentGeneral,
    InputGeneral,
  },

  data() {
    return {
      name: "",
      email: "",
      maxi: "",
      validate: false,
      uc: new SettingsUc(),
      backupUc: new BackupUc()
    };
  },

  computed: {
    isValidData() {
      return this.name && this.email && this.maxi;
    },

    ...mapState('loginStore', ['user'])
  },

  methods: {
    async save() {
      this.validate = true;

      if (this.isValidData) {
        utils.startLoading();
        const response = this.uc.createSettings(this.name, this.email, this.maxi);

        if (response) {
          const settings = JSON.parse(localStorage.getItem("settings"));
          this.setEmail(settings.email);
          this.setSettings(settings);

          this.$router.push("/");
        } else {
          notification.notify("Error guardando configuración");
        }
        utils.stopLoading();
      }
    },

    setData() {
      let settings = localStorage.getItem("settings");

      if (settings) {
        settings = JSON.parse(settings);

        this.name = settings.name;
        this.email = settings.email;
        this.maxi = utils.onlyNumber(settings.maxi);
      } else {
        this.email = this.user
      }
    },

    async doBackup () {
      await this.backupUc.createBackup(true)
    },

    async logout () {
      const response = await this.backupUc.logout()
      if (response) this.$router.push('/login')
    },

    ...mapMutations("settingsStore", ["setEmail", "setSettings"]),
  },

  created() {
    this.setData();
  },
};
</script>
