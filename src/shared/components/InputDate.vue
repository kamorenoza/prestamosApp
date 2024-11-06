<template>
  <div class="input-container">
    <f-icon class="input-icon" icon="fa-calendar-alt" />
    <datepicker input-class="input-general c-pointer" placeholder="Seleccione fecha" v-model="date" :language="es" />
    <valid-alert :data-value="date" :validate="validate" />
  </div>
</template>

<script>
import validAlert from "./validAlert.vue"
import Datepicker from 'vuejs-datepicker'
import {es} from 'vuejs-datepicker/dist/locale'

export default {
  name: "InputDate",

  components: {
    validAlert,
    Datepicker
  },

  props: {
    label: {
      type: [String, Date],
      default: "",
    },

    value: {
      type: [String, Number, Date],
      default: "",
    },

    validate: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      date: this.value,
      es: es
    }
  },

  watch: {
    date() {
      this.$emit("input", this.date)
    },

    value(value) {
      this.date = value
    },
  }
}
</script>
