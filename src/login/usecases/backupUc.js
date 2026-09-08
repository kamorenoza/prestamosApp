import LoginBackupRepository from "@/login/models/loginBackupRepository";
import moment from "moment";
import { utils } from "@/shared/utils";
import { notification } from "@/shared/notification";
import { googleDrive } from "@/shared/googleDrive";

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

      // Reconstruye TODO el remoto (doc principal + años) ANTES de escribir. Si falla, el catch aborta y no se pisa nada.
      const remote = await this.#readRemoteAll(settings.email)

      const clients = localStorage.getItem('clients')
      const loans = localStorage.getItem('loans')
      const fees = localStorage.getItem('fees')
      const expenses = localStorage.getItem('expenses')
      settings.version = moment().format('MM/DD/YYYY')

      // Fusion no destructiva: se conserva todo lo remoto; lo local (fuente de verdad) gana en conflicto.
      const mergedSettings = { ...remote.settings, ...settings }
      const mergedClients = this.#mergeById(remote.clients, clients ? JSON.parse(clients) : [])
      const mergedLoans = this.#mergeById(remote.loans, loans ? JSON.parse(loans) : [])
      const mergedFees = this.#mergeById(remote.fees, fees ? JSON.parse(fees) : [])
      const mergedExpenses = this.#mergeById(remote.expenses, expenses ? JSON.parse(expenses) : [])

      // Doc principal liviano (sin fees/expenses -> ya no topa el límite de 1 MB).
      await this.#repository.setMainDB(settings.email, {
        settings: mergedSettings,
        clients: mergedClients,
        loans: mergedLoans,
      })

      // fees/expenses particionados por año: una escritura por año tocado.
      const byYear = this.#groupByYear(mergedFees, mergedExpenses)
      for (const [year, bucket] of byYear) {
        await this.#repository.setYearDB(settings.email, year, bucket)
      }

      utils.stopLoading()
      if (notValidated) {
        const fullData = {
          settings: mergedSettings,
          clients: mergedClients,
          loans: mergedLoans,
          fees: mergedFees,
          expenses: mergedExpenses,
        }
        await this.#backupToDrive(fullData, settings.email)
        notification.confirm('Copia realizada correctamente', '', 'success')
      }
    } catch (error) {
      console.error(error)
      utils.stopLoading()
      notification.confirm('Ocurrió un error realizando la copia de seguridad', 'Error!', 'error')
    }
  }

  // Exporta el localStorage (fuente de verdad) a un archivo .json descargable. Funciona offline.
  downloadLocalBackup () {
    try {
      const data = {
        settings: JSON.parse(localStorage.getItem('settings')),
        clients: JSON.parse(localStorage.getItem('clients')) || [],
        loans: JSON.parse(localStorage.getItem('loans')) || [],
        fees: JSON.parse(localStorage.getItem('fees')) || [],
        expenses: JSON.parse(localStorage.getItem('expenses')) || [],
      }

      const email = data.settings?.email || 'copia'
      const stamp = moment().format('YYYY-MM-DD_HH-mm')
      const filename = `mis-prestamos-${email}-${stamp}.json`

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      return true
    } catch (error) {
      console.error(error)
      notification.confirm('No se pudo generar la copia local', 'Error!', 'error')
      return false
    }
  }

  // Une dos arreglos por id sin perder registros; el local gana en conflicto.
  #mergeById (remoteArr, localArr) {
    const byId = new Map()
    ;(remoteArr || []).forEach(item => { if (item && item.id != null) byId.set(item.id, item) })
    ;(localArr || []).forEach(item => { if (item && item.id != null) byId.set(item.id, item) })
    return Array.from(byId.values())
  }

  // ---- Restauración progresiva (no congela la app) ----

  // Carga rápida: settings + clients + loans + SOLO el año actual de fees/expenses.
  async restoreCurrent (email) {
    const mainDoc = await this.#repository.getMainFromDB(email)
    if (!mainDoc.exists()) return false

    const main = mainDoc.data()

    // Compatibilidad con backups viejos (todo en un solo doc): se hidrata completo.
    if (Array.isArray(main.fees) || Array.isArray(main.expenses)) {
      this.setBackup({
        settings: main.settings,
        clients: main.clients || [],
        loans: main.loans || [],
        fees: main.fees || [],
        expenses: main.expenses || [],
      })
      return { legacy: true }
    }

    localStorage.setItem('settings', JSON.stringify(main.settings))
    localStorage.setItem('clients', JSON.stringify(main.clients || []))
    localStorage.setItem('loans', JSON.stringify(main.loans || []))

    const year = moment().format('YYYY')
    const yearDoc = await this.#repository.getYearFromDB(email, year)
    const bucket = yearDoc.exists() ? yearDoc.data() : { fees: [], expenses: [] }
    localStorage.setItem('fees', JSON.stringify(bucket.fees || []))
    localStorage.setItem('expenses', JSON.stringify(bucket.expenses || []))

    return { legacy: false, year }
  }

  // En segundo plano: trae los demás años y los agrega al localStorage sin bloquear la UI.
  async restoreRestInBackground (email) {
    try {
      const currentYear = moment().format('YYYY')
      const snap = await this.#repository.getHistoryYears(email)
      if (!snap || snap.empty) return

      let fees = JSON.parse(localStorage.getItem('fees')) || []
      let expenses = JSON.parse(localStorage.getItem('expenses')) || []

      snap.forEach(docSnap => {
        if (docSnap.id === currentYear) return
        const bucket = docSnap.data() || {}
        fees = this.#mergeById(fees, bucket.fees || [])
        expenses = this.#mergeById(expenses, bucket.expenses || [])
      })

      localStorage.setItem('fees', JSON.stringify(fees))
      localStorage.setItem('expenses', JSON.stringify(expenses))
    } catch (error) {
      console.error(error)
    }
  }

  // Reconstruye TODO el remoto (doc principal + años) para la fusion no destructiva.
  async #readRemoteAll (email) {
    const mainDoc = await this.#repository.getMainFromDB(email)
    const main = mainDoc.exists() ? mainDoc.data() : {}

    let fees = Array.isArray(main.fees) ? main.fees : []
    let expenses = Array.isArray(main.expenses) ? main.expenses : []

    const snap = await this.#repository.getHistoryYears(email)
    if (snap && !snap.empty) {
      snap.forEach(docSnap => {
        const bucket = docSnap.data() || {}
        fees = fees.concat(bucket.fees || [])
        expenses = expenses.concat(bucket.expenses || [])
      })
    }

    return {
      settings: main.settings,
      clients: main.clients || [],
      loans: main.loans || [],
      fees,
      expenses,
    }
  }

  // Agrupa fees/expenses por año. Fecha de fee: 'DD-MM-YYYY'; de expense: ISO/Date.
  #groupByYear (fees, expenses) {
    const map = new Map()
    const bucket = (year) => {
      if (!map.has(year)) map.set(year, { fees: [], expenses: [] })
      return map.get(year)
    }

    ;(fees || []).forEach(fee => {
      const parts = (fee && fee.date ? String(fee.date) : '').split('-')
      const year = parts.length === 3 ? parts[2] : 'otros'
      bucket(year).fees.push(fee)
    })

    ;(expenses || []).forEach(exp => {
      const m = moment(exp && exp.date)
      const year = m.isValid() ? m.format('YYYY') : 'otros'
      bucket(year).expenses.push(exp)
    })

    return map
  }

  // Copia extra en el Google Drive del usuario. No bloquea el backup si falla.
  async #backupToDrive (data, email) {
    if (!googleDrive.isConfigured()) return

    try {
      const stamp = moment().format('YYYY-MM-DD_HH-mm')
      const filename = `mis-prestamos-${email}-${stamp}.json`
      await googleDrive.uploadJson(filename, data)
    } catch (error) {
      console.error(error)
      notification.confirm('La copia en la nube se guardó, pero falló la copia a Google Drive.', 'Aviso', 'warning')
    }
  }
}