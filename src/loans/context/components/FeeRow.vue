<template>
  <div class="m-fee" :class="addClass(fee.paidDate, fee.date)">
    <div @click="paidFee(fee, fee.paidDate)" class="m-fee__icon">
      <f-icon v-if="!fee.paidDate" icon="fa-regular fa-circle" class="m-fee__danger" />
      <f-icon v-else icon="fa-check-circle" class="m-fee__success" />
    </div>
    <div class="m-fee__body" @click="goToLoan()">
      <p class="m-fee__name" v-if="isHome">{{ clientName }}</p>
      <p class="text-book">{{ dateFee(fee.date) }}</p>
      <p v-if="fee.possibleDate" class="m-fee__label" >Posible pago: {{ fee.possibleDate | formatDate }}</p>
      <p v-else-if="fee.paidDate" class="m-fee__label" >Pagado {{ fee.paidDate | formatDate }}</p>
    </div>
    <div class="m-fee__amount" @click="goToLoan()">
      <p class="text-book">$ {{ fee.amount | formatNumber }}</p>
      <p v-if="fee.paidAmount > 0" class="m-fee__label m-fee__success text-book" >$ {{ fee.paidAmount | formatNumber }}</p>
    </div>
    <fee-actions v-if="!fee.paidDate" :fee="fee" :action="action" />
  </div>
</template>

<script>
import { utils } from "@/shared/utils";
import moment from "moment/moment";
import FeeActions from "@/loans/context/components/FeeActions";
import { notification } from "@/shared/notification";
import FeesUc from "@/loans/usecases/feesUc";
import LoansUc from "@/loans/usecases/loansUc";
import ClientsUc from "@/clients/usecases/clientsUc";
import { mapMutations } from "vuex";

export default {
  name: "FeeRow",

  components: {
    FeeActions
  },

  props: {
    fee: {
      type: Object
    },

    isHome: {
      type: Boolean,
      default: false
    },

    backRoute: {
      type: String,
      default: '/'
    },

    action: {
      type: Function,
      default: () => {}
    }
  },

  data() {
    return {
      uc: new FeesUc(),
      loansUc: new LoansUc(),
      clientsUc: new ClientsUc()
    }
  },

  computed: {
    loan () {
      return this.loansUc.getLoanById(this.fee.loanId)
    },

    clientName () {
      const client = this.clientsUc.getClientById(this.loan.clientId)

      return client.name
    },
  },

  methods: {
    dateFee (date) {
      const date2 = date.split('-')

      return utils.formatDate(`${date2[1]}/${date2[0]}/${date2[2]}`)
    },

    addClass (paid, date) {
      if (paid) return 'm-fee--paid'
      else {
        const date2 = date.split('-')
        const today = moment().format("MM/DD/YYYY")
        if (moment(`${date2[1]}/${date2[0]}/${date2[2]}`).isSameOrAfter(moment(today))) return ''
        else return 'm-fee--overdue'
      }
    },

    async paidFee (fee, paid) {
      const msg = paid ? 'NO PAGADA': 'PAGADA'
      const rta = await notification.confirm('Se actualizará la cuota a ' + msg)

      if (rta.isConfirmed) {
        this.uc.paidFee(fee.id)
        this.action()
      }
    },

    goToLoan() {
      if (this.isHome) {
        this.setLoanSelected(this.loan)
        this.setBackMainRoute('/')
        this.setBackRoute('/')
        this.$router.push('/detail-loan')
      }
    },

    ...mapMutations('loansStore', ['setLoanSelected', 'setBackRoute', 'setBackMainRoute'])
  }
}
</script>
