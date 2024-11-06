import { utils } from "@/shared/utils"
import moment from "moment"

export default class EarningsRepository {
  getEarnings (period, filter) {
    const settings = JSON.parse(localStorage.getItem("settings"))
    const maxiAmount = parseInt(settings.maxi.replaceAll('.', ''))

    let loans = localStorage.getItem('loans')
    let earnings = localStorage.getItem('earnings')
    const showEarnings = []

    const firstDatePeriod = utils.getFirstDay(period)
    const lastDatePeriod = utils.getLastDay(period)
    const year = moment(period).year()
    const month = moment(period).month()

    if (loans) {
      loans = JSON.parse(loans)

      loans.forEach(loan => {
        if (moment(loan.date).isBetween(firstDatePeriod, lastDatePeriod, undefined, '[]')) {
          if (filter === 1 && parseInt(loan.amount) >= maxiAmount) {
            const client = this.#getClientById(loan.clientId)
            showEarnings.push({ id: utils.getUId(), name: client.name, interes: loan.interes, year, month, date: loan.date })
          } else if (filter === 2 && parseInt(loan.amount) < maxiAmount) {
            const client = this.#getClientById(loan.clientId)
            showEarnings.push({ id: utils.getUId(), name: client.name, interes: loan.interes, year, month, date: loan.date })
          }
        }
      })
    }

    if (earnings) {
      earnings = JSON.parse(earnings)

      earnings.forEach(earning => {
        if (earning.month === month && earning.year === year) {
          if (filter === 1 && parseInt(earning.amount) >= maxiAmount) showEarnings.push(earning)
          else if (filter === 2 && parseInt(earning.amount) < maxiAmount) showEarnings.push(earning)
        }
      })
    }

    return showEarnings
  }

  #getClientById(id) {
    let clients = localStorage.getItem("clients")
    let clientByDoc

    if (clients) {
      clients = JSON.parse(clients)
      clientByDoc = clients.find(client => client.id === id)
    }

    return clientByDoc
  }

  addEarning (name, interes, year, month, date, amount) {
    const id = utils.getUId()
    interes = interes.replaceAll('.', '')

    let earnings = localStorage.getItem("earnings")
    earnings = earnings ? JSON.parse(earnings) : []
    const earning = { id, name, interes, year, month, date, amount }

    earnings.push(earning)
    localStorage.setItem("earnings", JSON.stringify(earnings))

    return earnings
  }
}
