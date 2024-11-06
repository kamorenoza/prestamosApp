<template>
  <div>
    <title-general title="Gastos diarios" />
    <pick-date-expenses />
    <total-expenses :total="total" />
    <content-general>
      <div class="pt-5 mt-4">
        <expense-row
          v-for="expense in expenses"
          :key="expense.id"
          :expense="expense"
          :action="init"
        />
      </div>
      <total-day :total="totalDay" />
    </content-general>
    <add-expense-modal :action="init" />
  </div>
</template>

<script>
import TitleGeneral from "@/shared/components/TitleGeneral";
import ContentGeneral from "@/shared/components/ContentGeneral";
import PickDateExpenses from "@/dailyExpenses/context/components/PickDateExpenses";
import TotalExpenses from "@/dailyExpenses/context/components/TotalExpenses";
import ExpenseRow from "@/dailyExpenses/context/components/ExpenseRow";
import TotalDay from "@/dailyExpenses/context/components/TotalDay";
import AddExpenseModal from "@/dailyExpenses/context/components/AddExpenseModal";
import ExpensesUc from "@/dailyExpenses/usecases/ExpensesUc";
import { mapMutations, mapState } from "vuex";

export default {
  name: "DailyExpensesView",

  components: {
    AddExpenseModal,
    TotalDay,
    ExpenseRow,
    TotalExpenses,
    PickDateExpenses,
    ContentGeneral,
    TitleGeneral
  },

  data() {
    return {
      uc: new ExpensesUc(),
      total: 0
    }
  },

  watch: {
    currentPeriod () {
      this.init()
    }
  },

  computed: {
    totalDay () {
      let total = 0

      this.expenses.forEach(exp => total = total + parseInt(exp.amount))

      return total
    },

    ...mapState('dailyExpensesStore', ['currentPeriod', 'expenses'])
  },

  methods: {
    init () {
      this.setExpenses(this.uc.getExpensesByDay(this.currentPeriod))
      this.total = this.uc.getTotalMonth(this.currentPeriod)
    },

    ...mapMutations('dailyExpensesStore', ['setExpenses'])
  },

  created() {
    this.init()
  }
}
</script>
