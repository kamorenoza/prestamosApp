<template>
  <div @click="goToLoan()" class="o-card">
    <div class="o-card-header">
      <div class="d-flex align-items-center o-card__name">
        <f-icon icon="fa-circle-dollar-to-slot" class="o-card__icon" />
        <p class="o-card__title pl-2">{{ name }}</p>
      </div>
      <p class="o-card__text-gray">{{ loan.date | formatDate }}</p>
    </div>

    <div class="d-flex justify-content-end o-card__total">
      <p>$ {{ loan.balance | formatNumber }}</p>
    </div>

    <div class="o-card-body">
      <div class="d-flex align-items-center justify-content-between">
        <p>Pagado:</p>
        <p class="text-book">$ {{ total | formatNumber }}</p>
      </div>

      <div class="d-flex align-items-center justify-content-between">
        <p>Saldo:</p>
        <p class="text-danger text-book">$ {{ balance(loan.balance) | formatNumber }}</p>
      </div>
      <div class="d-flex align-items-center justify-content-between">
        <p class="o-card__text-gray">Abonos: {{ numPaid }} de {{ totalFees }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import FeesUc from "@/loans/usecases/feesUc";
import { mapMutations } from "vuex";

export default {
  props: {
    loan: {
      type: Object
    },

    name: {
      type: String
    },

    backRoute: {
      type: String
    }
  },

  data() {
    return {
      uc: new FeesUc(),
      fees: [],
      total: 0,
      numPaid: 0
    }
  },

  computed: {
    totalFees () {
      return this.fees.length
    }
  },

  methods: {
    getFees () {
      this.fees = this.uc.getFeesByLoan(this.loan.id)

      const fees = this.uc.getTotalFees(this.loan.id)
      this.total = fees.total
      this.numPaid = fees.numPaid
    },

    goToLoan () {
      this.setBackRoute(this.backRoute)
      this.setLoanSelected(this.loan)

      this.$router.push('/detail-loan')
    },

    balance (balance) {
      return balance - this.total
    },

    ...mapMutations('loansStore', ['setBackRoute', 'setLoanSelected'])
  },

  created() {
    this.getFees()
  }
}
</script>
