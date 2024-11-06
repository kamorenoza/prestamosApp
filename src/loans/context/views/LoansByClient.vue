<template>
  <div>
    <title-general title="Prestamos del cliente" buttonBack="/detail-client" />
    <p class="text-white-title ml-4">{{ clientSelected.name }}</p>

    <content-general buttonText="Nuevo Préstamo" :buttonAction="goToSaveLoan">
      <loan-row v-for="loan in loans" :key="loan.id" :loan="loan" :name="clientSelected.name" back-route="/detail-client" />
    </content-general>
  </div>
</template>

<script>
import TitleGeneral from "@/shared/components/TitleGeneral.vue"
import ContentGeneral from "@/shared/components/ContentGeneral.vue"
import LoansUc from '@/loans/usecases/loansUc'
import { mapState } from 'vuex'
import LoanRow from '../components/LoanRow.vue'

export default {
  components: {
    TitleGeneral,
    ContentGeneral,
    LoanRow
  },

  data() {
    return {
      loans: [],
      uc: new LoansUc()
    }
  },

  computed: {
    ...mapState('clientsStore', ['clientSelected'])
  },

  methods: {
    getLoans() {
      this.loans = this.uc.getLoansByClient(this.clientSelected.id)
    },

    goToSaveLoan() {
      this.$router.push("save-loan")
    }
  },

  created() {
    this.getLoans()
  }
}
</script>
