import FeesRepository from "../models/feesRepository"
import LoansRepository from "../models/loansRepository"

export default class LoansUc {
  #loansRepository
  #feesRepository

  constructor() {
    this.#loansRepository = new LoansRepository()
    this.#feesRepository = new FeesRepository()
  }

  getLoansByClient(clientId) {
    return this.#loansRepository.getLoansByClient(clientId)
  }

  getLoanById(clientId) {
    return this.#loansRepository.getLoanById(clientId)
  }

  getAllLoans(filter, search) {
    return this.#loansRepository.getLoansFromLocal(filter, search)
  }

  saveLoan(clientId, date, amount, interes, typeTime, feesNum, done, balance, id, feesArray, feeAmount) {
    let response = {}

    if (!id) {
      response = this.#loansRepository.addLoanToLocal(clientId, date, amount, interes, typeTime, feesNum)
    } else {
      response = this.#loansRepository.updateLoanToLocal(id, clientId, date, amount, interes, typeTime, feesNum, done, balance)
      this.#feesRepository.deleteByLoan(id)
    }

    if (feesNum && typeTime) this.#feesRepository.addFeesToLocal(response.loan.id, feesArray, feeAmount)

    return response
  }

  deleteLoan (id) {
    return this.#loansRepository.deleteToLocal(id)
  }

  deleteByClient (idClient) {
    return this.#loansRepository.deleteByClient(idClient)
  }

  closeLoan (loan) {
    return this.#loansRepository.closeLoan(loan)
  }
}
