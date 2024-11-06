import { utils } from "@/shared/utils";
import moment from "moment";

export default class ExpensesRepository {
  getExpensesByDay (date) {
    date = moment(date)

    let expenses = localStorage.getItem("expenses")
    expenses = expenses ? JSON.parse(expenses) : []

    return expenses.filter(exp => {
      return moment(exp.date).isSame(date, 'day')
    })
  }

  getExpensesByMonth (date) {
    date = moment(date)
    const firstDate = utils.getFirstDay(date)
    const lastDate = utils.getLastDay(date)

    let expenses = localStorage.getItem("expenses")
    expenses = expenses ? JSON.parse(expenses) : []

    return expenses.filter(exp => {
      return moment(exp.date).isBetween(firstDate, lastDate, undefined, '[]')
    })
  }

  addExpense(date, description, amount) {
    const id = utils.getUId()
    amount = amount.replaceAll('.', '')

    let expenses = localStorage.getItem("expenses")
    expenses = expenses ? JSON.parse(expenses) : []
    const expense = { id, date, description, amount }

    expenses.push(expense)
    localStorage.setItem("expenses", JSON.stringify(expenses))

    return { expenses, expense: expense }
  }

  updateExpense(date, description, amount, id) {
    let expenses = localStorage.getItem("expenses")
    expenses = expenses ? JSON.parse(expenses) : []
    amount = amount.replaceAll('.', '')

    const expense = { id, date, description, amount }

    const index = expenses.findIndex((expense) => expense.id === id)
    if (index !== -1) {
      expenses[index] = expense
    }
    localStorage.setItem("expenses", JSON.stringify(expenses))

    return { expenses, expense: expense }
  }

  deleteExpense(id) {
    let expenses = JSON.parse(localStorage.getItem("expenses"))

    const index = expenses.findIndex((exp) => exp.id === id)
    if (index !== -1) expenses.splice(index, 1)

    localStorage.setItem("expenses", JSON.stringify(expenses))

    return { expenses }
  }
}
