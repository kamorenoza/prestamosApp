<template>
  <div class="m-select-period">
    <b-icon @click="changePeriod()" icon="chevron-double-left" />

    <div class="m-select-period__calendar">
      <b-form-datepicker
        id="datepicker-2"
        locale="es"
        v-model="date"
        button-only
        today-button
        label-today-button="Seleccionar hoy"
      />
      <p>{{ currentPeriod | formatDate }} </p>
    </div>

    <b-icon @click="changePeriod(true)" icon="chevron-double-right" />
  </div>
</template>

<script>
import { utils } from '@/shared/utils'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'PickDate',

  data() {
    return {
      date: this.currentPeriod
    }
  },

  watch: {
    date(value) {
      if (value !== this.currentPeriod) this.setCurrentPeriod(value)
    },

    currentPeriod(value) {
      if (value !== this.date) this.date = value
    }
  },

  computed: {
    ...mapState('homeStore', ['currentPeriod'])
  },

  methods: {
    changePeriod(next) {
      if (next) this.setCurrentPeriod(utils.sumDays(this.currentPeriod, 1))
      else this.setCurrentPeriod(utils.subtractDays(this.currentPeriod, 1))
    },

    ...mapMutations('homeStore', ['setCurrentPeriod'])
  }
}
</script>
