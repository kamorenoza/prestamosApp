<template>
  <div class="input-container">
    <f-icon v-if="icon" class="input-icon" :icon="icon" />
    <input
      class="input-general"
      :type="type"
      :class="customClass"
      :maxlength="max"
      v-model="text"
      :placeholder="label"
      :disabled="disabled"
    />
    <valid-alert :data-value="text" :validate="validate" />
  </div>
</template>

<script>
import { utils } from "../utils";
import validAlert from "./validAlert.vue";

export default {
  name: "InputGeneral",

  components: {
    validAlert,
  },

  props: {
    label: {
      type: String,
      default: "",
    },

    value: {
      type: [String, Number],
      default: "",
    },

    customClass: {
      type: String,
      default: "",
    },

    max: {
      type: Number,
    },

    isNumber: {
      type: Boolean,
      default: false,
    },

    isDocument: {
      type: Boolean,
      default: false,
    },

    validate: {
      type: Boolean,
      default: false,
    },

    icon: {
      type: String,
      default: "",
    },

    isEmail: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      text: this.value,
    };
  },

  watch: {
    text(value) {
      if (this.isNumber) this.text = utils.onlyNumber(value);
      if (this.isDocument) this.text = utils.onlyNumberDoc(value);
      this.$emit("input", this.text);
    },

    value(value) {
      this.text = value;
    },
  },

  computed: {
    type() {
      if (this.isNumber || this.isDocument) return "tel";
      if (this.isEmail) return "email";

      return "text";
    },
  },
};
</script>
