<template>
  <div class="search-container">
    <b-icon class="search-icon" icon="search" />
    <input
      class="search-input"
      type="text"
      :maxlength="max"
      v-model="text"
      :placeholder="label"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },

    value: {
      type: [String, Number],
      default: "",
    },

    max: {
      type: Number,
    },
  },

  data() {
    return {
      text: this.value,
    };
  },

  watch: {
    text() {
      this.$emit("input", this.text);
    },

    value(value) {
      this.text = value;
    },
  },
};
</script>
