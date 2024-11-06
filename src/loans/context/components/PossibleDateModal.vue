<template>
  <b-modal @show="fillData" id="feeModalDate" hide-footer centered hide-header content-class="border-0" body-class="p-0">
    <div class="o-modal">
      <div class="o-modal__header">
        <p>Agregar posible fecha pago</p>
      </div>
      <div class="o-modal__body">
        <input-date v-model="date" />
      </div>
      <div class="o-modal__footer">
        <p class="o-modal__action" @click="closeModal()">CANCELAR</p>
        <p class="o-modal__action" @click="clear()">LIMPIAR</p>
        <p class="o-modal__action" @click="saveFee()">ACEPTAR</p>
      </div>
    </div>
  </b-modal>
</template>


<script>
import InputDate from "@/shared/components/InputDate";
import { mapMutations, mapState } from "vuex";
import { notification } from "@/shared/notification";
import FeesUc from "@/loans/usecases/feesUc";

export default {
  name: "PossibleDateModal",

  props: {
    action: {
      type: Function,
      default: () => {}
    }
  },

  components: { InputDate },

  data() {
    return {
      date: '',
      uc: new FeesUc(),
    }
  },

  computed: {
    ...mapState('loansStore', ['loanSelected', 'feeSelected'])
  },

  methods: {
    closeModal () {
      this.$bvModal.hide('feeModalDate')
      this.date = ''
      this.setFeeSelected(null)
    },

    saveFee () {
      const response = this.uc.possibleDateFee(this.date, this.feeSelected.id)

      if (response) {
        notification.notify('Guardado corrrectamente')
        this.closeModal()
        this.action()
      }
    },

    fillData () {
      if (this.feeSelected && this.feeSelected.possibleDate) {
        this.date = new Date(this.feeSelected.possibleDate)
        this.id = this.feeSelected.id
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

