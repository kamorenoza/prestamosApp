<template>
  <b-modal
    @show="fill()"
    @hidden="clear()"
    id="addExpenseModal"
    hide-footer
    centered
    hide-header
    content-class="border-0"
    body-class="p-0"
  >
    <div class="o-modal">
      <div class="o-modal__header">
        <p>Gasto diario</p>
      </div>
      <div class="o-modal__body">
        <input-date v-model="date" />
        <input-general v-model="description" icon="fa-comment" label="Descripción" />
        <input-general v-model="amount" is-number icon="fa-hand-holding-dollar" label="Valor" />
      </div>
      <div class="o-modal__footer">
        <p class="o-modal__action" @click="hideModal()">CANCELAR</p>
        <p class="o-modal__action" @click="addExpense()">ACEPTAR</p>
      </div>
    </div>
  </b-modal>
</template>

<script>
import InputDate from "@/shared/components/InputDate"
import InputGeneral from "@/shared/components/InputGeneral";
import ExpensesUc from "@/dailyExpenses/usecases/ExpensesUc";
import { notification } from "@/shared/notification";
import { mapMutations, mapState } from "vuex";
import moment from "moment";

export default {
  name: "AddExpenseModal",

  components: {
    InputGeneral,
    InputDate
  },

  props: {
    action: {
      type: Function
    }
  },

  data() {
    return {
      date: new Date(moment(this.currentPeriod)),
      description: '',
      amount: '',
      id: '',
      uc: new ExpensesUc()
    }
  },

  computed: {
    isValid () {
      return this.date && this.description.trim() && this.amount
    },

    ...mapState('dailyExpensesStore', ['currentPeriod', 'expenseSelected'])
  },

  methods: {
    hideModal () {
      this.$bvModal.hide('addExpenseModal')
    },

    async addExpense () {
      if (!this.isValid) return false

      this.uc.saveExpense(this.date, this.description, this.amount, this.id)
      this.action()

      await notification.notify('Guardado correctamente')
      this.hideModal()
    },

    fill () {
      this.date = new Date(moment(this.currentPeriod))

      if (this.expenseSelected) {
        this.date = new Date(moment(this.expenseSelected.date))
        this.amount = this.expenseSelected.amount
        this.description = this.expenseSelected.description
        this.id = this.expenseSelected.id
      }
    },

    clear () {
      this.setExpenseSelected(null)
      this.date = new Date(moment(this.currentPeriod))
      this.amount = ''
      this.description = ''
      this.id = ''
    },

    ...mapMutations('dailyExpensesStore', ['setExpenseSelected'])
  }
}
</script>
