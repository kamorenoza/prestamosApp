<template>
  <div class="m-total-expenses">
    <div class="text-center">
      <p class="m-total-expenses__subtitle">Gastos totales de {{ month }}</p>
      <p class="m-total-expenses__amount">$ {{ total | formatNumber }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import { monthsLongToString } from "@/shared/constants";

export default {
  name: "TotalExpenses",

  props: {
    total: {
      type: [ Number, String ],
      default: 0
    }
  },

  computed: {
    month () {
      const date = moment(this.currentPeriod)

      return monthsLongToString(date.month() + 1)
    },

    ...mapState('dailyExpensesStore', ['currentPeriod'])
  }
}
</script>
