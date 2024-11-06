<template>
  <div class="m-title" :class="classTitle">
    <div v-if="buttonBack" @click="goTo()" class="m-title__button">
      <f-icon icon="fa-arrow-left-long" />
    </div>
    <p class="m-title__text">{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },

    buttonBack: {
      type: String,
      default: "",
    },
  },

  computed: {
    classTitle() {
      return this.buttonBack ? "m-title--back" : "";
    },
  },

  methods: {
    goTo() {
      this.$router.push(this.buttonBack);
    },
  },
};
</script>
