import { utils } from "@/shared/utils"
import moment from 'moment'
import { TYPE_MAXI, TYPE_MINI } from "@/shared/constants"

export default class FeesRepository {
  addFeeToLocal (date, amount, loanId) {
    amount = amount.replaceAll('.', '')

    let fees = localStorage.getItem("fees")
    fees = fees ? JSON.parse(fees) : []

    const id = utils.getUId()
    fees.push({ id, loanId, date, amount, paidAmount: 0, paidDate: new Date(), possibleDate: '' })

    localStorage.setItem("fees", JSON.stringify(fees))

    return { fees }
  }

  updateFee(date, amount, id) {
    let fees = JSON.parse(localStorage.getItem("fees"))
    amount = amount.replaceAll('.', '')

    const index = fees.findIndex((fee) => fee.id === id)
    if (index !== -1) {
      let fee = fees[index]
      fee.date = date
      fee.amount = amount
      fees[index] = fee
    }

    localStorage.setItem("fees", JSON.stringify(fees))

    return { fees }
  }

  addFeesToLocal(loanId, feesArray, feeAmount) {
    feeAmount = feeAmount.replaceAll('.', '')

    let fees = localStorage.getItem("fees")
    fees = fees ? JSON.parse(fees) : []

    feesArray.forEach(dateFee => {
      const id = utils.getUId()
      fees.push({ id, loanId, date: dateFee, amount: feeAmount, paidAmount: 0, paidDate: '', possibleDate: '' })
    })

    localStorage.setItem("fees", JSON.stringify(fees))

    return { fees }
  }

  getFeesByLoan(loanId) {
    let fees = localStorage.getItem("fees")
    let feesFilter = []

    if (fees) {
      fees = JSON.parse(fees)
      feesFilter = fees.filter(fee => fee.loanId === loanId )
    }

    feesFilter = feesFilter.sort((a, b) => {
      const date1 = b.date.split('-')
      const date2 = a.date.split('-')
      const newDate1 = `${date1[1]}/${date1[0]}/${date1[2]}`
      const newDate2 = `${date2[1]}/${date2[0]}/${date2[2]}`

      return new Date(newDate2) - new Date(newDate1)
    })

    return feesFilter
  }

  getTotalFees(loanId) {
    let fees = localStorage.getItem("fees")
    let total = 0
    let numPaid = 0

    if (fees) {
      fees = JSON.parse(fees)
      fees.forEach(fee => {
        if (fee.loanId === loanId) {
          if (fee.paidDate) {
            total += parseInt(fee.amount)
            numPaid++
          } else {
            total += parseInt(fee.paidAmount)
          }
        }
      })
    }

    return { total, numPaid }
  }

  deleteByLoan (loanId) {
    let fees = localStorage.getItem("fees")
    fees = fees ? JSON.parse(fees) : []

    const feesFilter = fees.filter(fee => fee.loanId !== loanId )

    localStorage.setItem("fees", JSON.stringify(feesFilter))
  }

  deleteFee (id) {
    let fees = localStorage.getItem("fees")
    fees = fees ? JSON.parse(fees) : []

    const feesFilter = fees.filter(fee => fee.id !== id )

    localStorage.setItem("fees", JSON.stringify(feesFilter))
  }

  paidFee(id) {
    let fees = JSON.parse(localStorage.getItem("fees"))

    const index = fees.findIndex((fee) => fee.id === id)
    if (index !== -1) {
      let fee = fees[index]
      fee.paidDate = fee.paidDate ? '' : new Date()
      fee.possibleDate = ''
      fee.paidAmount = 0
      fees[index] = fee
    }

    localStorage.setItem("fees", JSON.stringify(fees))
  }

  possibleDateFee (date, id) {
    let fees = JSON.parse(localStorage.getItem("fees"))

    const index = fees.findIndex((fee) => fee.id === id)

    if (index !== -1) {
      let fee = fees[index]
      fee.possibleDate = date
      fees[index] = fee
    }

    localStorage.setItem("fees", JSON.stringify(fees))

    return { fees }
  }

  paidAmountFee (amount, id) {
    let fees = JSON.parse(localStorage.getItem("fees"))
    amount = amount ? amount.replaceAll('.', '') : 0

    const index = fees.findIndex((fee) => fee.id === id)

    if (index !== -1) {
      let fee = fees[index]
      fee.paidAmount = amount
      fees[index] = fee
    }

    localStorage.setItem("fees", JSON.stringify(fees))

    return { fees }
  }

  getFeesByDate (date, filter) {
    let fees = localStorage.getItem("fees")
    let feesFilter = []
    const settings = JSON.parse(localStorage.getItem("settings"))
    const maxiAmount = parseInt(settings.maxi.replaceAll('.', ''))

    date = moment(date)
    let today = moment().format('YYYY-MM-DD')

    if (fees) {
      fees = JSON.parse(fees)

      feesFilter = fees.filter(fee => {
        const feeDate = moment(this.getDate(fee.date))

        const loan = this.getLoanById(fee.loanId)

        if (filter === TYPE_MAXI && (parseInt(loan.amount) < maxiAmount)) return false
        if (filter === TYPE_MINI && (parseInt(loan.amount) >= maxiAmount)) return false

        if (date.isSame(moment(today))) {
          return feeDate.isSameOrBefore(date) && !fee.paidDate
        } else return feeDate.isSame(date) && !fee.paidDate
      })
    }

    return feesFilter
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

  getDate (date) {
    const date2 = date.split('-')

    return `${date2[1]}/${date2[0]}/${date2[2]}`
  }
}
