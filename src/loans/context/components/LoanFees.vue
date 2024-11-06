<template>
  <div class="p-2 mt-2">
    <div class="d-flex align-items-center justify-content-between mb-2">
      <div class="d-flex align-items-center">
        <p class="text-book">Cuotas</p>
        <b-icon-plus-circle-fill @click="openModal()" class="ml-2 m-fee__add-fee" />
      </div>
      <p class="o-card__text-gray o-detail-loan__counter">{{ numPaid }} de {{ numTotalFees }}</p>
    </div>
    <div class="o-detail-loan__fees-container">
      <fee-row  v-for="fee in fees" :key="fee.id" :fee="fee" :action="getFees" />
    </div>
    <add-fee-modal :action="getFees" />
    <possible-date-modal :action="getFees" />
    <paid-amount-modal :action="getFees" />
  </div>
</template>

<script>
import FeesUc from "@/loans/usecases/feesUc";
import { mapMutations, mapState } from "vuex";
import AddFeeModal from "@/loans/context/components/AddFeeModal";
import PossibleDateModal from "@/loans/context/components/PossibleDateModal";
import PaidAmountModal from "@/loans/context/components/PaidAmountModal";
import FeeRow from "@/loans/context/components/FeeRow";

export default {
  name: "LoanFees",

  components: { FeeRow, PaidAmountModal, PossibleDateModal, AddFeeModal },

  props: {
    fees: {
      type: Array
    },

    numPaid: {
      type: [ String, Number ]
    }
  },

  data() {
    return {
      uc: new FeesUc()
    }
  },

  computed: {
    numTotalFees () {
      return this.fees.length
    },

    ...mapState('loansStore', ['loanSelected'])
  },

  methods: {
    getFees () {
      const fees = this.uc.getFeesByLoan(this.loanSelected.id)
      const totalFees = this.uc.getTotalFees(this.loanSelected.id)

      this.setFees({ fees: fees, total: totalFees.total, numPaid: totalFees.numPaid })
    },

    openModal () {
      this.$bvModal.show('feeModal')
    },

    ...mapMutations('loansStore', ['setFees'])
  }
}
</script>
