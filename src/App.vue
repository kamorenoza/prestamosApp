<template>
  <div id="app">
    <navbar-menu v-if="showNavbar" />
    <router-view />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import NavbarMenu from "./shared/components/NavbarMenu.vue";
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import LoginBackupRepository from "@/login/models/loginBackupRepository";
import BackupUc from "@/login/usecases/backupUc";
import { utils } from "@/shared/utils";

const uc = new BackupUc()

export default {
  components: {
    NavbarMenu,
  },

  computed: {
    showNavbar () {
      return this.$route.name !==  'login'
    }
  },

  methods: {
    async loginUserSuccess (user) {
      utils.startLoading()
      const response = await uc.getAllData(user.email)
      this.setEmail(user.email)

      if (response) this.whenUserLogin(response)
      else {
        utils.stopLoading()
        this.$router.push('/settings')
      }
    },

    async whenUserLogin (data) {
      uc.setBackup(data)
      this.setSettings(JSON.parse(localStorage.getItem('settings')))
      utils.stopLoading()

      if (this.$route.name !== '/') this.$router.push('/')
    },

    logoutUser () {
      const repoLogin = new LoginBackupRepository()
      repoLogin.logoutLocal()
      if (this.$route.name !== 'login') this.$router.push('/login')
    },

    ...mapMutations("loginStore", ["setEmail"]),
    ...mapMutations('settingsStore', ['setSettings'])
  },

  async created () {
    if (!localStorage.getItem('settings')) {
      if (this.$route.name !== 'login') this.$router.push('/login')

      onAuthStateChanged(auth, currentUser => {
        if (!localStorage.getItem('settings')) {
          currentUser ? this.loginUserSuccess(currentUser) : this.logoutUser()
        }
      })
    } else {
      this.setSettings(JSON.parse(localStorage.getItem('settings')))
      if (window.navigator.onLine) await uc.createBackup()
    }
  }
};
</script>
