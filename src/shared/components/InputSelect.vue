<template>
  <div class="input-container">
    <f-icon v-if="icon" class="input-icon" :icon="icon" />
    <b-form-select class="input-general" v-model="selected" :options="options"  />
    <valid-alert :data-value="selected" :validate="validate" />
  </div>
</template>

<script>
import validAlert from "./validAlert.vue"
import {es} from 'vuejs-datepicker/dist/locale'

export default {
  name: "InputSelect",

  components: {
    validAlert
  },

  props: {
    label: {
      type: [String],
      default: "",
    },

    value: {
      type: [String, Number, Date],
      default: "",
    },

    icon: {
      type: String,
      default: "",
    },

    options: {
      type: Array
    },

    validate: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      selected: this.value,
      es: es
    }
  },

  watch: {
    selected() {
      this.$emit("input", this.selected)
    },

    value(value) {
      this.selected = value
    },
  }
}
</script>
