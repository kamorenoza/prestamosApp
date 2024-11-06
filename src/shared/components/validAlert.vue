<template>
  <div class="valid-alert">
    <small
      v-if="validate && (!dataValue.toString().trim() || dataValue === 0)"
      class="text-danger"
      >{{ message }}</small
    >
  </div>
</template>

<script>
export default {
  name: "validAlert",

  props: {
    message: {
      type: String,
      default: "Campo obligatorio",
    },

    dataValue: {
      type: [String, Number, Object, Date],
      default: "",
    },

    validate: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
