import ExpensesRepository from "@/dailyExpenses/models/expensesRepository";

export default class ExpensesUc {
  #expensesRepository

  constructor() {
    this.#expensesRepository = new ExpensesRepository()
  }

  saveExpense (date, description, amount, id) {
    if (id) {
      return this.#expensesRepository.updateExpense(date, description, amount, id)
    }

    return this.#expensesRepository.addExpense(date, description, amount)
  }

  getExpensesByDay (date) {
    return this.#expensesRepository.getExpensesByDay(date)
  }

  getTotalMonth (date) {
    const expenses = this.#expensesRepository.getExpensesByMonth(date)
    let total = 0

    expenses.forEach(exp => total = total + parseInt(exp.amount))

    return total
  }

  deleteExpense (id) {
    return this.#expensesRepository.deleteExpense(id)
  }
}
