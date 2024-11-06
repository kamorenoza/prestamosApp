<template>
  <div>
    <title-general title="" :buttonBack="backRoute" />
    <div class="o-loan">
      <p class="o-loan__name"> {{ clientName() }} </p>
      <div class="o-loan__card">
        <input-date v-model="date" class="mb-3" />
        <input-general v-model="amount" :max="11" class="mb-3" label="Capital" is-number icon="fa-money-bill-wave" />
        <input-general v-model="interes" :max="11" class="mb-3" label="Interés" is-number icon="fa-hand-holding-dollar" />

        <div class="d-flex align-items-center justify-content-between">
          <input-general class="mb-0" v-model="fees" label="Cuotas" :max="3" is-document icon="fa-repeat" />
          <input-select class="mb-0" :options="typesTimes" v-model="typeTime" />
        </div>
      </div>

      <div class="o-loan__body">
        <div v-if="isValidData">
          <p class="o-loan__title">Valor de la cuota</p>
          <p class="mb-4">$ {{ feeValue }}</p>

          <p class="o-loan__title">Fechas de las cuotas</p>
          <div class="o-loan__dates">
            <ul>
              <li v-for="(date, index) in paymentDates" :key="index">{{ date }}</li>
            </ul>
          </div>
        </div>

        <div class="l-button">
          <button class="button-general" @click="save()">GUARDAR PRÉSTAMO</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleGeneral from "@/shared/components/TitleGeneral.vue"
import { mapMutations, mapState } from 'vuex'
import InputDate from '@/shared/components/InputDate.vue'
import InputGeneral from '@/shared/components/InputGeneral.vue'
import InputSelect from '@/shared/components/InputSelect.vue'
import { calculateFees } from '@/shared/calculateFees'
import { utils } from '@/shared/utils'
import LoansUc from '@/loans/usecases/loansUc'
import { notification } from '@/shared/notification'
import ClientsUc from "@/clients/usecases/clientsUc";


export default {
  components: {
    TitleGeneral,
    InputDate,
    InputGeneral,
    InputSelect
  },

  data() {
    return {
      id: "",
      date: '',
      amount: '',
      interes: '',
      fees: '',
      typeTime: '',
      balance: 0,
      paymentDates: [],
      validate: false,
      uc: new LoansUc(),
      clientsUc: new ClientsUc()
    }
  },

  watch: {
    date() {
      this.calculate()
    },

    amount() {
      this.calculate()
    },

    interes() {
      this.calculate()
    },

    fees() {
      this.calculate()
    },

    typeTime() {
      this.calculate()
    }
  },

  computed: {
    typesTimes () {
      return [
        { value: '', text: 'Plazo' },
        { value: 1, text: 'Diario' },
        { value: 8, text: 'Semanal' },
        { value: 15, text: 'Quincenal' },
        { value: 30, text: 'Mensual' },
      ]
    },

    isValidData () {
      return this.date && this.amount && this.interes && this.typeTime && this.fees
    },

    isValidDataFees () {
      return this.date && this.amount && this.interes
    },

    feeValue () {
      const amount = this.amount.replaceAll('.', '')
      const interes = this.interes.replaceAll('.', '')
      return utils.onlyNumber(parseInt((parseInt(amount) + parseInt(interes)) / parseInt(this.fees)))
    },

    ...mapState('loansStore', ['loanSelected', 'backRoute']),
    ...mapState('clientsStore', ['clientSelected'])
  },

  methods: {
    setCurrentDate () {
      this.date = new Date()
    },

    calculate () {
     this.paymentDates = calculateFees.calculate(this.date, this.fees, this.typeTime)
    },

    async save () {
      this.validate = true

      if (this.isValidDataFees) {
        const response = this.uc.saveLoan(
          this.clientId(),
          this.date,
          this.amount,
          this.interes,
          this.typeTime,
          this.fees,
          false,
          this.balance,
          this.id,
          this.paymentDates,
          this.feeValue,
        )

        await notification.notify('Préstamo guardado correctamente')
        this.setLoanSelected(response.loan)
        this.$router.push('/detail-loan')
      }
    },

    fillData () {
      if (this.loanSelected) {
        this.id = this.loanSelected.id
        this.date = new Date(this.loanSelected.date)
        this.amount = utils.formatNumber(this.loanSelected.amount)
        this.interes = utils.formatNumber(this.loanSelected.interes)
        this.fees = this.loanSelected.feesNum
        this.fees = this.loanSelected.feesNum
        this.balance = this.loanSelected.balance
        this.typeTime = this.loanSelected.typeTime
        this.calculate()
      }
    },

    clientName () {
      if (this.loanSelected) {
        const client = this.clientsUc.getClientById(this.loanSelected.clientId)

        return client.name
      }

      return this.clientSelected ? this.clientSelected.name : ''
    },

    clientId () {
      if (this.loanSelected) {
        const client = this.clientsUc.getClientById(this.loanSelected.clientId)

        return client.id
      }

      return this.clientSelected ? this.clientSelected.id : ''
    },

    ...mapMutations('loansStore', ['setLoanSelected', 'setBackRoute'])
  },

  created() {
    this.setCurrentDate()
    this.fillData()
  },
}
</script>
