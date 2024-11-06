<template>
  <div class="o-detail-loan__actions">
    <div class="text-center mr-3">
      <f-icon @click="amountDetails()" icon="fa-circle-info" />
      <p>Detalles</p>
    </div>

    <div class="text-center mr-3">
      <f-icon @click="editLoan()" icon="fa-pen"/>
      <p>Editar</p>
    </div>

    <div class="text-center">
      <f-icon @click="deleteLoan()" icon="fa-trash-can"/>
      <p>Eliminar</p>
    </div>
    <amount-loan-details />
  </div>
</template>

<script>

import { mapMutations, mapState } from "vuex";
import { notification } from "@/shared/notification";
import LoansUc from "@/loans/usecases/loansUc";
import ClientsUc from "@/clients/usecases/clientsUc";
import AmountLoanDetails from "@/loans/context/components/AmountLoanDetails";

export default {
  name: "LoanActions",

  components: {
    AmountLoanDetails
  },

  data() {
    return {
      uc: new LoansUc(),
      clientsUc: new ClientsUc()
    }
  },

  computed: {
    ...mapState('loansStore', ['loanSelected']),
  },

  methods: {
    editLoan () {
      this.setClientSelected(this.clientsUc.getClientById(this.loanSelected.clientId))
      this.setBackRoute('/detail-loan')
      this.$router.push('/save-loan')
    },

    async deleteLoan() {
      const rta = await notification.confirm(
        "Se eliminará el prestamo y todos los abonos hechos, ¿Está seguro?"
      )

      if (rta.isConfirmed) {
        this.uc.deleteLoan(this.loanSelected.id)
        this.setLoanSelected(null)

        await notification.notify("Préstamos eliminado")
        this.$router.push("/detail-client")
      }
    },

    amountDetails () {
      this.$bvModal.show('amountLoanDetails')
    },

    ...mapMutations('loansStore', ['setLoanSelected', 'setBackRoute']),
    ...mapMutations('clientsStore', ['setClientSelected'])
  }
}
</script>
