import LoginBackupRepository from "@/login/models/loginBackupRepository";
import moment from "moment";
import { utils } from "@/shared/utils";
import { notification } from "@/shared/notification";

export default class BackupUc {
  #repository

  constructor () {
    this.#repository = new LoginBackupRepository()
  }

  async logout () {
    const confirmation = await notification.confirm('Se cerrará la sesión, desea continuar?')
    if (!confirmation.isConfirmed) return false

    try {
      await this.#repository.logout()
      this.#repository.logoutLocal()

      return true
    } catch (error) {
      console.error(error)
    }
  }

  async getAllData (email) {
    try {
      const data = await this.#repository.getAllDataFromDB(email)

      if (data.exists()) {
        return data.data()
      } else {
        return false
      }
    } catch (error) {
      console.error(error)
    }
  }

  async validVersion (email) {
    try {
      const data = await this.#repository.getAllDataFromDB(email)

      if (data.exists()) {
        const allData = data.data()
        const version = allData.settings.version
        const today = moment().format('MM/DD/YYYY')

        return moment(today).isSame(version);

      } else return false
    } catch (error) {
      console.error(error)
    }
  }

  setBackup (data) {
    const settings = data.settings
    const clients = data.clients
    const loans = data.loans
    const fees = data.fees
    const expenses = data.expenses

    localStorage.setItem('settings', JSON.stringify(settings))
    if (clients) localStorage.setItem('clients', JSON.stringify(clients))
    if (loans) localStorage.setItem('loans', JSON.stringify(loans))
    if (fees) localStorage.setItem('fees', JSON.stringify(fees))
    if (expenses) localStorage.setItem('expenses', JSON.stringify(expenses))
  }

  async createBackup (notValidated) {
    if (notValidated) {
      const confirmation = await notification.confirm('La copia de seguridad tomará unos minutos, desea continuar?')
      if (!confirmation.isConfirmed) return  false
    }

    utils.startLoading()
    let settings = JSON.parse(localStorage.getItem('settings'))

    try {
      if (!notValidated) {
        utils.stopLoading()
        if (await this.validVersion(settings.email)) return false
      }

      const clients = localStorage.getItem('clients')
      const loans = localStorage.getItem('loans')
      const fees = localStorage.getItem('fees')
      const expenses = localStorage.getItem('expenses')
      settings.version = moment().format('MM/DD/YYYY')

      let data = { settings }

      if (clients) data.clients = JSON.parse(clients)
      if (loans) data.loans = JSON.parse(loans)
      if (fees) data.fees = JSON.parse(fees)
      if (expenses) data.expenses = JSON.parse(expenses)

      await this.#repository.createBackupDB(data, settings.email)

      utils.stopLoading()
      if (notValidated) {
        notification.confirm('Copia realizada correctamente', '', 'success')
      }
    } catch (error) {
      console.error(error)
      utils.stopLoading()
      notification.confirm('Ocurrió un error realizando la copia de seguridad', 'Error!', 'error')
    }
  }
}
