import FeesRepository from "../models/feesRepository"

export default class FeesUc {
  #feesRepository

  constructor() {
    this.#feesRepository = new FeesRepository()
  }

  addFee (date, amount, loanId, id) {
    let response = ''

    if (id) {
      response = this.#feesRepository.updateFee(date, amount, id)
    } else {
      response = this.#feesRepository.addFeeToLocal(date, amount, loanId)
    }

    return response
  }

  getFeesByLoan(loanId) {
    return this.#feesRepository.getFeesByLoan(loanId)
  }

  getTotalFees(loanId) {
    return this.#feesRepository.getTotalFees(loanId)
  }

  paidFee(id) {
    return this.#feesRepository.paidFee(id)
  }

  deleteFee(id) {
    return this.#feesRepository.deleteFee(id)
  }

  possibleDateFee(date, id) {
    return this.#feesRepository.possibleDateFee(date, id)
  }

  paidAmountFee(amount, id) {
    return this.#feesRepository.paidAmountFee(amount, id)
  }

  getFeesByDate(date, filter) {
    return this.#feesRepository.getFeesByDate(date, filter)
  }
}
