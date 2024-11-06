<template>
  <b-modal @show="fillData" id="feeModalAmount" hide-footer centered hide-header content-class="border-0" body-class="p-0">
    <div class="o-modal">
      <div class="o-modal__header">
        <p>Agregar posible fecha pago</p>
      </div>
      <div class="o-modal__body">
        <input-general v-model="amount" is-number icon="fa-hand-holding-dollar" label="Valor" />
      </div>
      <div class="o-modal__footer">
        <p class="o-modal__action" @click="closeModal()">CANCELAR</p>
        <p class="o-modal__action" @click="saveFee()">ACEPTAR</p>
      </div>
    </div>
  </b-modal>
</template>


<script>
import { mapMutations, mapState } from "vuex";
import { notification } from "@/shared/notification";
import FeesUc from "@/loans/usecases/feesUc";
import InputGeneral from "@/shared/components/InputGeneral";
import { utils } from "@/shared/utils";

export default {
  name: "PaidAmountModal",

  props: {
    action: {
      type: Function,
      default: () => {}
    }
  },

  components: { InputGeneral },

  data() {
    return {
      amount: '',
      uc: new FeesUc(),
    }
  },

  computed: {
    ...mapState('loansStore', ['loanSelected', 'feeSelected'])
  },

  methods: {
    closeModal () {
      this.$bvModal.hide('feeModalAmount')
      this.date = ''
      this.setFeeSelected(null)
    },

    saveFee () {
      const response = this.uc.paidAmountFee(this.amount, this.feeSelected.id)

      if (response) {
        notification.notify('Guardado corrrectamente')
        this.closeModal()
        this.action()
      }
    },

    fillData () {
      if (this.feeSelected && this.feeSelected.paidAmount) {
        this.amount = utils.formatNumber(this.feeSelected.paidAmount)
      }
    },

    clear () {
      this.date = ''
    },

    ...mapMutations('loansStore', ['setFeeSelected'])
  },

  created () {
    this.fillData()
  }
}
</script>

