import { utils } from "@/shared/utils"
import ClientsRepository from "@/clients/models/clientsRepository";
import { TYPE_MINI, TYPE_OTHERS } from "@/shared/constants";
import FeesRepository from "@/loans/models/feesRepository";
import EarningsRepository from "@/earnings/models/earningsRepository";
import moment from "moment";

export default class LoansRepository {
  #clientsRepository
  #feesRepository
  #earningsRepository

  constructor() {
    this.#clientsRepository = new ClientsRepository()
    this.#feesRepository = new FeesRepository()
    this.#earningsRepository = new EarningsRepository()
  }

  getLoansFromLocal(filter, search) {
    let loans = localStorage.getItem("loans")
    const settings = JSON.parse(localStorage.getItem("settings"))
    const maxiAmount = parseInt(settings.maxi.replaceAll('.', ''))

    let loansFilter = []

    if (search && search.trim()) {
      loans = this.getLoansFromLocalBySearch(search)
    } else {
      loans = JSON.parse(loans)
    }

    if (loans) {
      loansFilter = loans.filter(loan => !loan.closed)
    }

    let { maxi, mini, others } = this.#counterLoans(loansFilter, maxiAmount)
    loansFilter = this.#filterLoans(loansFilter, filter, maxiAmount)
    let total = this.#totalBalance(loansFilter)

    return { loansFilter, maxi, mini, others, total }
  }

  #counterLoans (loansFilter, maxiAmount) {
    let maxi = 0
    let mini = 0
    let others = 0

    loansFilter.forEach(loan => {
      const loanAmount = parseInt(loan.amount)
      if (!loan.feesNum || !loan.typeTime) {
        others += 1
      } else {
        if (loanAmount < maxiAmount) mini += 1
        if (loanAmount >= maxiAmount) maxi += 1
      }
    })

    return { maxi, mini, others }
  }

  #filterLoans (loans, type, maxiAmount) {
    return loans.filter(loan => {
      if (type === TYPE_OTHERS) return !loan.feesNum || !loan.typeTime
      else {
        if (loan.feesNum && loan.typeTime) {
          if (type === TYPE_MINI) return parseInt(loan.amount) < maxiAmount
          else return parseInt(loan.amount) >= maxiAmount
        }
      }
    })
  }

  #totalBalance (loansFilter) {
    let total = 0

    loansFilter.forEach(loan => {
      const feesTotal = this.#feesRepository.getTotalFees(loan.id)
      total += parseInt(loan.balance) - feesTotal.total
    })

    return total
  }

  getLoansByClient(clientId) {
    let loans = localStorage.getItem("loans")
    let loansFilter = []

    if (loans) {
      loans = JSON.parse(loans)
      loansFilter = loans.filter(loan => loan.clientId === clientId )
    }

    return loansFilter
  }

  getLoanById(id) {
    let loans = localStorage.getItem("loans")
    let loansFilter = []

    if (loans) {
      loans = JSON.parse(loans)
      loansFilter = loans.filter(loan => loan.id === id )
    }

    return loansFilter[0]
  }

  getLoansFromLocalBySearch(search) {
    let clients = localStorage.getItem("clients")
    let loansFilter = []

    if (clients) {
      clients = JSON.parse(clients)
      const clientsFilter = clients.filter((client) => {
        let str = utils.normalizeText(client.name.toLowerCase())
        return str.indexOf(utils.normalizeText(search.toLowerCase())) >= 0
      })

      clientsFilter.forEach(client => {
        loansFilter = loansFilter.concat(this.getLoansByClient(client.id))
      })
    }

    return loansFilter
  }

  addLoanToLocal(clientId, date, amount, interes, typeTime, feesNum) {
    const id = utils.getUId()
    amount = amount.replaceAll('.', '')
    interes = interes.replaceAll('.', '')
    const balance = parseInt(amount) + parseInt(interes)

    let loans = localStorage.getItem("loans")
    loans = loans ? JSON.parse(loans) : []
    const loan = { id, clientId, date, amount, interes, typeTime, feesNum, done: false, balance, closed: false }

    loans.push(loan)
    localStorage.setItem("loans", JSON.stringify(loans))

    return { loans, loan: loan }
  }

  updateLoanToLocal(id, clientId, date, amount, interes, typeTime, feesNum, done) {
    amount = amount.replaceAll('.', '')
    interes = interes.replaceAll('.', '')
    const balance = parseInt(amount) + parseInt(interes)

    let loans = JSON.parse(localStorage.getItem("loans"))
    const loan = { id, clientId, date, amount, interes, typeTime, feesNum, done, balance, closed: false }

    const index = loans.findIndex((loan) => loan.id === id)
    if (index !== -1) loans[index] = loan

    localStorage.setItem("loans", JSON.stringify(loans))

    return { loans, loan: loan }
  }

  deleteToLocal(id) {
    let loans = JSON.parse(localStorage.getItem("loans"))
    let fees = JSON.parse(localStorage.getItem("fees"))

    const index = loans.findIndex((loan) => loan.id === id)
    if (index !== -1) {
      loans.splice(index, 1)
    }
    const newFees = fees.filter(fee => fee.loanId !== id)

    localStorage.setItem("loans", JSON.stringify(loans))
    localStorage.setItem("fees", JSON.stringify(newFees))

    return { loans }
  }

  deleteByClient(clientId) {
    let loans = JSON.parse(localStorage.getItem("loans"))
    let fees = JSON.parse(localStorage.getItem("fees"))
    let newFees = []

    const clientLoans = loans.filter(loan => loan.clientId === clientId )

    clientLoans.forEach(loan => {
      newFees = fees.filter(fee => fee.loanId !== loan.id)
    })

    const newLoans = loans.filter(loan => loan.clientId !== clientId)

    localStorage.setItem("loans", JSON.stringify(newLoans))
    localStorage.setItem("fees", JSON.stringify(newFees))

    return { loans }
  }

  closeLoan (id) {
    let loans = JSON.parse(localStorage.getItem("loans"))
    let loan = null

    const index = loans.findIndex((loan) => loan.id === id)
    if (index !== -1) loan = loans [index]

    const client = this.#clientsRepository.getClientById(loan.clientId)
    const year = moment(loan.date).year()
    const month = moment(loan.date).month()

    this.#earningsRepository.addEarning(client.name, loan.interes, year, month, loan.date, loan.amount)

    this.deleteToLocal(id)

    return { loans }
  }
}
