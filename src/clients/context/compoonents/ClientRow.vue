<template>
  <div class="m-client-row">
    <div @click="goToDetails()">
      <p class="m-client-row__name">{{ client.name }}</p>
    </div>

    <div class="d-flex align-items-center">
      <div @click="makeCall()" class="m-client-row__icon">
        <f-icon icon="fa-phone" />
      </div>

      <div class="m-client-row__body">
        <p @click="goToDetails()" class="m-client-row__text">
          {{ client.mobile }}
        </p>
        <p @click="goToDetails()" class="m-client-row__text">
          {{ client.address }} {{ client.nbh }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    client: {
      type: Object,
      required: true,
    },
  },

  methods: {
    makeCall() {
      window.open("tel:+57" + this.client.mobile, "_self");
    },

    goToDetails() {
      this.setClientSelected(this.client);
      this.$router.push("/detail-client");
    },

    ...mapMutations("clientsStore", ["setClientSelected"]),
  },
};
</script>
