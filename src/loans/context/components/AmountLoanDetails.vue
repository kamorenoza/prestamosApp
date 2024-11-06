<template>
  <b-modal id="amountLoanDetails" hide-footer centered hide-header content-class="border-0" body-class="p-0">
    <div class="o-modal">
      <div class="o-modal__header">
        <p>Detalles del préstamo</p>
      </div>
      <div class="o-modal__body">
        <div class="d-flex align-items-center">
          <div class="o-detail-loan__fees"/>
          <div>
            <p class="o-card__text-gray">Capital</p>
            <p class="text-book">$ {{ loanSelected.amount | formatNumber }}</p>
          </div>
        </div>

        <div class="d-flex align-items-center mt-2">
          <div class="o-detail-loan__fees"/>
          <div>
            <p class="o-card__text-gray">Interés</p>
            <p class="text-book">$ {{ loanSelected.interes | formatNumber }}</p>
          </div>
        </div>
      </div>
      <div class="o-modal__footer">
        <p class="o-modal__action" @click="closeModal()">CERRAR</p>
      </div>
    </div>
  </b-modal>
</template>

<script>

import { mapState } from "vuex";

export default {
  name: "AmountLoanDetails",

  computed: {
    ...mapState('loansStore', ['loanSelected'])
  },

  methods: {
    closeModal () {
      this.$bvModal.hide('amountLoanDetails')
    }
  },
}
</script>
