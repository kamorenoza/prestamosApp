<template>
  <div class="m-expense">
    <div class="m-expense__icon">
      <f-icon icon="fa-coins" />
    </div>
    <div class="m-expense__body">
      <p>{{ expense.description }}</p>
      <p class="text-book">$ {{ expense.amount | formatNumber }}</p>
    </div>
    <div class="m-expense__actions">
      <div class="m-expense__action m-expense__delete" @click="deleteExp()">
        <f-icon icon="fa-trash-can" />
      </div>
      <div class="m-expense__action m-expense__edit" @click="edit()">
        <f-icon icon="fa-pen" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { notification } from "@/shared/notification";
import ExpensesUc from "@/dailyExpenses/usecases/ExpensesUc";

export default {
  name: "ExpenseRow",

  props: {
    expense: {
      type: Object
    },

    action: {
      type: Function
    }
  },

  data() {
    return {
      uc: new ExpensesUc()
    }
  },

  methods: {
    edit () {
      this.setExpenseSelected(this.expense)
      this.$bvModal.show('addExpenseModal')
    },

    async deleteExp () {
      const rta = await notification.confirm("Se eliminará el gasto, ¿Está seguro?")

      if (rta.isConfirmed) {
        this.uc.deleteExpense(this.expense.id)

        await notification.notify("Gasto eliminado")
        this.action()
      }
    },

    ...mapMutations('dailyExpensesStore', ['setExpenseSelected'])
  }
}
</script>
