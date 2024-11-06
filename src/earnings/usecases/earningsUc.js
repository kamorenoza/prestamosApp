import EarningsRepository from "@/earnings/models/earningsRepository";

export default class EarningsUc {
  #earningsRepository

  constructor() {
    this.#earningsRepository = new EarningsRepository()
  }

  getAllEarnings (period, filter) {
    return this.#earningsRepository.getEarnings(period, filter)
  }

  getTotalEarnings (period, filter) {
    const earnings = this.#earningsRepository.getEarnings(period, filter)
    let total = 0

    earnings.forEach(earning => {
      total += parseInt(earning.interes)
    })

    return total
  }
}
