<template>
  <div>
    <title-general title="Ganancias" />
    <pick-month-year />
    <content-general>
      <earnings-filter />
      <earnings-total :total="total" />
      <div>
        <earning-row v-for="earning in earnings" :key="earning.id" :earning="earning" />
      </div>
    </content-general>
  </div>
</template>

<script>
import TitleGeneral from "@/shared/components/TitleGeneral";
import PickMonthYear from "@/earnings/context/components/PickMonthYear";
import ContentGeneral from "@/shared/components/ContentGeneral";
import EarningsFilter from "@/earnings/context/components/EarningsFilter";
import EarningsTotal from "@/earnings/context/components/EsrningsTotal";
import EarningsUc from "@/earnings/usecases/earningsUc";
import { mapState } from "vuex";
import EarningRow from "@/earnings/context/components/EarningRow";

export default {
  name: "EarningsView",

  components: {
    EarningRow,
    EarningsTotal,
    EarningsFilter,
    ContentGeneral,
    PickMonthYear,
    TitleGeneral
  },

  data() {
    return {
      uc: new EarningsUc(),
      earnings: [],
      total: 0
    }
  },

  watch: {
    currentPeriod () {
      this.init()
    },

    filterSelected () {
      this.init()
    }
  },

  computed: {
    ...mapState('earningsStore', ['currentPeriod', 'filterSelected'])
  },

  methods: {
    init () {
      this.earnings = this.uc.getAllEarnings(this.currentPeriod, this.filterSelected)
      this.total = this.uc.getTotalEarnings(this.currentPeriod, this.filterSelected)
    }
  },

  created() {
    this.init()
  }
}
</script>
