<template>
  <div class="m-filters m-filters--two">
    <div @click="setFilterSelected(maxi)" :class="classSelected(maxi)" class="m-filters__item">
      <div class="m-filters__icon">
        <f-icon icon="fa-up-long" />
      </div>
      <div>
        <p class="m-filters__title">Maxi</p>
      </div>
    </div>

    <div @click="setFilterSelected(mini)" :class="classSelected(mini)" class="m-filters__item">
      <div class="m-filters__icon">
        <f-icon icon="fa-down-long" />
      </div>
      <div>
        <p class="m-filters__title">Mini</p>
      </div>
    </div>
  </div>
</template>

<script>
import { TYPE_MAXI, TYPE_MINI } from "@/shared/constants"
import { mapMutations, mapState } from "vuex"

export default {
  name: "EarningsFilter",

  computed: {
    maxi () {
      return TYPE_MAXI
    },

    mini () {
      return TYPE_MINI
    },

    ...mapState('earningsStore', ['filterSelected'])
  },

  methods: {
    classSelected (item) {
      return this.filterSelected === item ? 'm-filters--selected' : ''
    },

    ...mapMutations('earningsStore', ['setFilterSelected'])
  }
}
</script>
