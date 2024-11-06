<template>
  <div>
    <title-general title="" :buttonBack="goToBack" />
    <div class="o-detail-loan">
      <div class="o-detail-loan__header">
        <p>{{ clientName }}</p>

        <div class="d-flex align-items-center justify-content-between">
          <p class="amount"> $ {{ loanSelected.balance | formatNumber }}</p>

          <loan-actions />
        </div>
      </div>

      <div class="o-detail-loan__body">
        <loan-card :balance="loanSelected.balance" :total-amount="total" />

        <div class="d-flex align-items-center">
          <div class="o-detail-loan__calendar"/>
          <div>
            <p class="o-card__text-gray">Fecha de inicio del préstamo</p>
            <p class="text-book">{{ loanSelected.date | formatDate }}</p>
          </div>
        </div>

        <div class="d-flex align-items-center mt-2">
          <div class="o-detail-loan__fees"/>
          <div>
            <p class="o-card__text-gray">Plazo del préstamo</p>
            <p class="text-book"> {{ loanSelected.feesNum }} {{ typeTime }}</p>
          </div>
        </div>

        <loan-fees :fees="fees" :num-paid="numPaid" />
      </div>
    </div>
  </div>
</template>

<script>
import TitleGeneral from "@/shared/components/TitleGeneral"
import { mapMutations, mapState } from "vuex";
import FeesUc from "@/loans/usecases/feesUc";
import LoanCard from "@/loans/context/components/LoanCard";
import LoanFees from "@/loans/context/components/LoanFees";
import LoanActions from "@/loans/context/components/LoanActions";
import ClientsUc from "@/clients/usecases/clientsUc";
import { notification } from "@/shared/notification";
import LoansUc from "@/loans/usecases/loansUc";

export default {
  components: {
    LoanActions,
    LoanFees,
    LoanCard,
    TitleGeneral
  },

  data() {
    return {
      uc: new FeesUc(),
      clientsUc: new ClientsUc(),
      loansUc: new LoansUc()
    }
  },

  computed: {
    typeTime () {
      if (this.loanSelected.feesNum && this.loanSelected.typeTime) {
        const numFees = this.loanSelected.feesNum
        if (this.loanSelected.typeTime === 1) return numFees > 1 ? 'días' : 'Día'
        if (this.loanSelected.typeTime === 8) return numFees > 1 ? 'Semanas' : 'Semana'
        if (this.loanSelected.typeTime === 15) return numFees > 1 ? 'Quincenas' : 'Quincena'

        return numFees > 1 ? 'Meses' : 'Mes'
      } else {
        return 'Sin plazo definido'
      }
    },

    clientName () {
      const client = this.clientsUc.getClientById(this.loanSelected.clientId)

      return client.name
    },

    goToBack () {
      if (this.backMainRoute === '/clients') {
        const loans = this.loansUc.getLoansByClient(this.loanSelected.clientId)
        const number = loans.length

        return number > 1 ? '/loans-client' : '/detail-client'
      }
      return this.backMainRoute
    },

    ...mapState('loansStore', ['backRoute', 'loanSelected', 'fees', 'total', 'numPaid', 'backMainRoute'])
  },

  methods: {
    getFees () {
      const fees = this.uc.getFeesByLoan(this.loanSelected.id)
      const totalFees = this.uc.getTotalFees(this.loanSelected.id)

      this.setFees({ fees: fees, total: totalFees.total, numPaid: totalFees.numPaid })
    },

    async validateLoan () {
      if (this.total === this.loanSelected.balance) {
        const rta = await notification.confirm("El préstamos ya está pagado, dese cerrarlo?")

        if (rta.isConfirmed) {
          this.loansUc.closeLoan(this.loanSelected.id)
          await notification.notify('Préstamo cerrado')
          this.$router.push(this.backRoute)
        }
      }
    },

    ...mapMutations('loansStore', ['setFees'])
  },

  created() {
    if (!this.loanSelected) return this.$router.push('/loans')
    this.getFees()
    this.validateLoan()
  }
}
</script>
