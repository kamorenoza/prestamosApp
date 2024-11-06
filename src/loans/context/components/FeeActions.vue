<template>
  <div class="m-fee__actions"  v-click-outside="close">
    <b-icon-three-dots-vertical @click="changeShow()" />
    <div v-if="show" class="m-fee__options">
      <div @click="edit()" class="m-fee__item">Editar cuota</div>
      <div @click="deleteFee()" class="m-fee__item">Eliminar cuota</div>
      <div @click="possibleDate()" class="m-fee__item">Posible fecha pago</div>
      <div @click="paidAmountDate()" class="m-fee__item">Agregar abono</div>
      <div @click="paidAmountDate()" class="m-fee__item">Editar abono</div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { notification } from "@/shared/notification";
import FeesUc from "@/loans/usecases/feesUc";

export default {
  name: "FeeActions",

  props: {
    fee: {
      type: Object
    },

    action: {
      type: Function
    }
  },

  data() {
    return {
      show: false,
      uc: new FeesUc()
    }
  },

  methods: {
    changeShow () {
      this.show = !this.show
    },

    close () {
      this.show = false
    },

    edit () {
      this.setFeeSelected(this.fee)
      this.$bvModal.show('feeModal')
    },

    possibleDate () {
      this.setFeeSelected(this.fee)
      this.$bvModal.show('feeModalDate')
    },

    paidAmountDate () {
      this.setFeeSelected(this.fee)
      this.$bvModal.show('feeModalAmount')
    },

    async deleteFee() {
      const rta = await notification.confirm(
        "Se eliminará la cuota, ¿Está seguro?"
      )

      if (rta.isConfirmed) {
        this.uc.deleteFee(this.fee.id)

        await notification.notify("Cuota eliminada")
        this.action()
      }
    },

    ...mapMutations('loansStore', ['setFeeSelected'])
  }
}
</script>
