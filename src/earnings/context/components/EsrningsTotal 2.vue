<template>
  <div class="m-loan-total m-loan-total--earnings">
    <p class="m-loan-total__subtitle">{{ title }}</p>
    <p class="m-loan-total__text">$ {{ total | formatNumber }}</p>
  </div>
</template>

<script>

import { mapState } from "vuex";
import moment from "moment";
import { monthsToString, TYPE_MAXI } from "@/shared/constants";

export default {
  name: "EarningsTotal",

  props: {
    total: {
      type: [ String, Number ],
      default: 0
    }
  },

  computed: {
    title () {
      const month = monthsToString(moment(this.currentPeriod).month() + 1)
      const type = this.filterSelected === TYPE_MAXI ? 'Maxi' : 'Mini'

      return `Total Ganancias ${type} ${month}`
    },

    ...mapState('earningsStore', ['currentPeriod', 'filterSelected'])
  }
}
</script>

