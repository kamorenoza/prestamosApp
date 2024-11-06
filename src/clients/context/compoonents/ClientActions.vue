<template>
  <div class="o-detail-client__actions">
    <div @click="goToEdit()" class="o-detail-client__action">
      <div class="o-detail-client__icon edit"></div>
      <p>Editar</p>
    </div>

    <div @click="goToSaveLoan()" class="o-detail-client__action">
      <div class="o-detail-client__icon new"></div>
      <p>Nuevo préstamo</p>
    </div>

    <div @click="goToLoans()" class="o-detail-client__action">
      <div class="o-detail-client__icon see"></div>
      <p>Préstamos</p>
    </div>

    <div @click="deleteClient()" class="o-detail-client__action">
      <div class="o-detail-client__icon delete"></div>
      <p>Eliminar</p>
    </div>
  </div>
</template>

<script>
import { notification } from '@/shared/notification'
import ClientsUc from '@/clients/usecases/clientsUc'
import { mapMutations, mapState } from "vuex";
import LoansUc from "@/loans/usecases/loansUc";

export default {
  data() {
    return {
      uc: new ClientsUc(),
      loansUc: new LoansUc()
    }
  },

  computed: {
    ...mapState("clientsStore", ["clientSelected"]),
  },

  methods: {
    goToEdit() {
      this.$router.push("save-client")
    },

    goToSaveLoan() {
      this.setBackRoute('/detail-client')
      this.$router.push("save-loan")
    },

    goToLoans() {
      const loans = this.loansUc.getLoansByClient(this.clientSelected.id)
      const number = loans.length

      if (number === 0) this.goToSaveLoan()
      else if (number === 1) {
        this.setBackRoute('/detail-client')
        this.setLoanSelected(loans[0])
        this.$router.push("detail-loan")
      }
      else this.$router.push("loans-client")
    },

    async deleteClient() {
      const rta = await notification.confirm(
        "Se eliminará el cliente, todos los prestamos hechos y las ganancias, ¿Está seguro?"
      )

      if (rta.isConfirmed) {
        this.uc.deleteClient(this.clientSelected.id)

        await notification.notify("Cliente eliminado")
        this.$router.push("/clients")
      }
    },

    ...mapMutations('loansStore', ['setBackRoute', 'setLoanSelected'])
  },
}
</script>
