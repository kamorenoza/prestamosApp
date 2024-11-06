<template>
  <div>
    <title-general title="" />
    <pick-date />
    <content-general>
      <home-filters />
      <div class="pt-4">
        <fee-row v-for="fee in fees" :key="fee.id" :fee="fee" is-home :action="init" backRoute="/" />
      </div>
    </content-general>

    <possible-date-modal :action="init" />
    <paid-amount-modal :action="init" />
  </div>
</template>

<script>
import TitleGeneral from "@/shared/components/TitleGeneral.vue"
import ContentGeneral from "@/shared/components/ContentGeneral.vue"
import FeesUc from "@/loans/usecases/feesUc";
import FeeRow from "@/loans/context/components/FeeRow";
import PickDate from "@/shared/components/PickDate";
import { mapMutations, mapState } from "vuex";
import PossibleDateModal from "@/loans/context/components/PossibleDateModal";
import PaidAmountModal from "@/loans/context/components/PaidAmountModal";
import HomeFilters from "@/home/context/components/HomeFilters";

export default {
  components: {
    HomeFilters,
    PickDate,
    FeeRow,
    TitleGeneral,
    ContentGeneral,
    PossibleDateModal,
    PaidAmountModal
  },

  data() {
    return {
      uc: new FeesUc(),
      fees: []
    }
  },

  computed: {
    ...mapState('homeStore', ['currentPeriod', 'filterSelected'])
  },

  watch: {
    currentPeriod () {
      this.init()
    },

    filterSelected () {
      this.init()
    }
  },

  methods: {
    init () {
      this.fees = this.uc.getFeesByDate(this.currentPeriod, this.filterSelected)
      this.setBackRoute('/')
      this.setBackMainRoute('/')
    },

    ...mapMutations('loansStore', ['setBackRoute', 'setBackMainRoute'])
  },

  created() {
    this.init()
  }
}
</script>
