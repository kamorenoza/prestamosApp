<template>
  <div class="m-filters">
    <div @click="setFilterSelected(maxi)" :class="classSelected(maxi)" class="m-filters__item">
      <div class="m-filters__icon">
        <f-icon icon="fa-up-long" />
      </div>
      <div>
        <p class="m-filters__title">Maxi</p>
        <p class="m-filters__text">{{ loans.maxi }} préstamos</p>
      </div>
    </div>

    <div @click="setFilterSelected(mini)" :class="classSelected(mini)" class="m-filters__item">
      <div class="m-filters__icon">
        <f-icon icon="fa-down-long" />
      </div>
      <div>
        <p class="m-filters__title">Mini</p>
        <p class="m-filters__text">{{ loans.mini }} préstamos</p>
      </div>
    </div>

    <div @click="setFilterSelected(others)" :class="classSelected(others)" class="m-filters__item">
      <div class="m-filters__icon">
        <f-icon icon="fa-ellipsis-vertical" />
      </div>
      <div>
        <p class="m-filters__title">Otros</p>
        <p class="m-filters__text">{{ loans.others }} préstamos</p>
      </div>
    </div>
  </div>
</template>

<script>
import { TYPE_MAXI, TYPE_MINI, TYPE_OTHERS } from "@/shared/constants"
import { mapMutations, mapState } from "vuex"

export default {
  name: "LoansFilters",

  computed: {
    maxi () {
      return TYPE_MAXI
    },

    mini () {
      return TYPE_MINI
    },

    others () {
      return TYPE_OTHERS
    },

    ...mapState('loansStore', ['filterSelected', 'loans'])
  },

  methods: {
    classSelected (item) {
      return this.filterSelected === item ? 'm-filters--selected' : ''
    },

    ...mapMutations('loansStore', ['setFilterSelected'])
  }
}
</script>

