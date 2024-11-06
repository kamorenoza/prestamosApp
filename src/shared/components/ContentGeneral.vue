<template>
  <div :class="classWButton" class="l-general">
    <div class="l-content">
      <slot />
      <div v-if="buttonText" class="l-button">
        <button class="button-general" @click="buttonAction()">
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    buttonText: {
      type: String,
      default: "",
    },

    buttonAction: {
      type: Function,
      default: () => {},
    },

    isSearch: {
      type: Boolean,
      default: false,
    },

    hasFilters: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    showButton() {
      return this.buttonText;
    },

    classWButton() {
      let classGeneral = "";

      if (this.showButton) classGeneral += "l-general--button ";
      if (this.isSearch) classGeneral += "l-general--search ";
      if (this.hasFilters) classGeneral += "l-general--filters ";

      return classGeneral;
    },
  },
};
</script>
