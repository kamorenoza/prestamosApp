<template>
  <b-modal @show="fillData" id="feeModal" hide-footer centered hide-header content-class="border-0" body-class="p-0">
    <div class="o-modal">
      <div class="o-modal__header">
        <p>Agregar cuota</p>
      </div>
      <div class="o-modal__body">
        <input-date v-model="date" />
        <input-general v-model="amount" is-number icon="fa-hand-holding-dollar" label="Valor" />
      </div>
      <div class="o-modal__footer">
        <p class="o-modal__action" @click="closeModal()">CANCELAR</p>
        <p class="o-modal__action" @click="addFee()">ACEPTAR</p>
      </div>
    </div>
  </b-modal>
</template>

<script>
import InputDate from "@/shared/components/InputDate";
import InputGeneral from "@/shared/components/InputGeneral";
import FeesUc from "@/loans/usecases/feesUc";
import { mapMutations, mapState } from "vuex";
import { notification } from "@/shared/notification";
import moment from "moment";
import { utils } from "@/shared/utils";

export default {
  name: "AddFeeModal",

  props: {
    action: {
      type: Function,
      default: () => {}
    }
  },

  components: {
    InputGeneral,
    InputDate
  },

  data() {
    return {
      date: new Date(),
      amount: '',
      uc: new FeesUc(),
      id: ''
    }
  },

  computed: {
    ...mapState('loansStore', ['loanSelected', 'feeSelected'])
  },

  methods: {
    closeModal () {
      this.$bvModal.hide('feeModal')
      this.date = new Date()
      this.amount = ''
      this.setFeeSelected(null)
    },

    addFee () {
      const date = moment(this.date).format('DD-MM-YYYY')
      const response = this.uc.addFee(date, this.amount, this.loanSelected.id, this.id)

      if (response) {
        notification.notify('Cuota agregada corrrectamente')
        this.closeModal()
        this.action()
      }
    },

    fillData () {
      if (this.feeSelected) {
        const date2 = this.feeSelected.date.split('-')

        this.date = new Date(`${date2[1]}/${date2[0]}/${date2[2]}`)
        this.amount = utils.formatNumber(this.feeSelected.amount)
        this.id = this.feeSelected.id
      }
    },

    ...mapMutations('loansStore', ['setFeeSelected'])
  },

  created () {
    this.fillData()
  }
}
</script>
