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

    let step = 'init'
    try {
      const email = settings.email
      const weekId = this.#currentWeekId()
      const today = moment().format('MM/DD/YYYY')

      // En backup automático evita reescribir si esta semana ya se guardó hoy.
      if (!notValidated) {
        step = 'getWeekMeta(guard)'
        const existing = await this.#repository.getWeekMeta(email, weekId)
        if (existing.exists() && existing.data().version === today) {
          utils.stopLoading()
          return false
        }
      }

      const clients = JSON.parse(localStorage.getItem('clients') || '[]')
      const loans = JSON.parse(localStorage.getItem('loans') || '[]')
      const fees = JSON.parse(localStorage.getItem('fees') || '[]')
      const expenses = JSON.parse(localStorage.getItem('expenses') || '[]')
      settings.version = today

      // Snapshot exacto de localStorage (fuente de verdad). Sin merge -> refleja borrados.
      const byYear = this.#groupByYear(fees, expenses)

      // Índice liviano de semanas.
      step = 'getWeeksIndex'
      const idxDoc = await this.#repository.getWeeksIndex(email)
      const idx = idxDoc.exists() ? idxDoc.data() : { ids: [], latest: null, baselineCreated: false }
      if (!Array.isArray(idx.ids)) idx.ids = []

      // Bootstrap: SOLO la primera vez (sin ninguna semana) se crea la copia
      // permanente inmutable. Se escribe una vez y nunca se vuelve a tocar.
      if (!idx.baselineCreated && idx.ids.length === 0) {
        step = 'getFrozenBaselineMeta'
        const baseMeta = await this.#repository.getFrozenBaselineMeta(email)
        if (!baseMeta.exists()) {
          step = 'setFrozenBaselineMeta'
          await this.#repository.setFrozenBaselineMeta(email, { settings, clients, loans, createdAt: Date.now() })
          for (const [year, bucket] of byYear) {
            step = 'setFrozenBaselineYear:' + year
            await this.#repository.setFrozenBaselineYear(email, year, bucket)
          }
        }
        idx.baselineCreated = true
      }

      // Semana actual: ESTA sí se sobreescribe en cada copia de la misma semana.
      step = 'setWeekMeta:' + weekId
      await this.#repository.setWeekMeta(email, weekId, { settings, clients, loans, version: today, updatedAt: Date.now() })
      for (const [year, bucket] of byYear) {
        step = 'setWeekYear:' + weekId + '/' + year
        await this.#repository.setWeekYear(email, weekId, year, bucket)
      }

      if (!idx.ids.includes(weekId)) idx.ids.push(weekId)
      idx.latest = weekId
      step = 'setWeeksIndex'
      await this.#repository.setWeeksIndex(email, idx)

      // Retención: últimos 4 años completos + 1 por año para lo más viejo.
      step = 'applyRetention'
      await this.#applyRetention(email, idx)

      utils.stopLoading()
      if (notValidated) {
        notification.confirm('Copia realizada correctamente', '', 'success')
      }
    } catch (error) {
      console.error('[backup] FALLO en paso:', step, error)
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

  // ---- Restauración progresiva (no congela la app) ----

  // Carga rápida: última semana (settings + clients + loans + SOLO el año actual).
  async restoreCurrent (email) {
    const idxDoc = await this.#repository.getWeeksIndex(email)
    const idx = idxDoc.exists() ? idxDoc.data() : null

    // Sin semanas todavía -> intenta el formato antiguo (doc principal + history).
    if (!idx || !idx.latest) return this.#restoreLegacy(email)

    const metaDoc = await this.#repository.getWeekMeta(email, idx.latest)
    if (!metaDoc.exists()) return this.#restoreLegacy(email)

    const meta = metaDoc.data()
    localStorage.setItem('settings', JSON.stringify(meta.settings))
    localStorage.setItem('clients', JSON.stringify(meta.clients || []))
    localStorage.setItem('loans', JSON.stringify(meta.loans || []))

    const year = moment().format('YYYY')
    const yearDoc = await this.#repository.getWeekYear(email, idx.latest, year)
    const bucket = yearDoc.exists() ? yearDoc.data() : { fees: [], expenses: [] }
    localStorage.setItem('fees', JSON.stringify(bucket.fees || []))
    localStorage.setItem('expenses', JSON.stringify(bucket.expenses || []))

    return { legacy: false, year }
  }

  // En segundo plano: trae los demás años de la última semana y los agrega.
  async restoreRestInBackground (email) {
    try {
      const idxDoc = await this.#repository.getWeeksIndex(email)
      const idx = idxDoc.exists() ? idxDoc.data() : null
      if (!idx || !idx.latest) return

      const currentYear = moment().format('YYYY')
      const snap = await this.#repository.getWeekYears(email, idx.latest)
      if (!snap || snap.empty) return

      let fees = JSON.parse(localStorage.getItem('fees')) || []
      let expenses = JSON.parse(localStorage.getItem('expenses')) || []

      // Snapshot exacto: cada año de la semana se concatena (sin merge).
      snap.forEach(docSnap => {
        if (docSnap.id === currentYear) return
        const bucket = docSnap.data() || {}
        fees = fees.concat(bucket.fees || [])
        expenses = expenses.concat(bucket.expenses || [])
      })

      localStorage.setItem('fees', JSON.stringify(fees))
      localStorage.setItem('expenses', JSON.stringify(expenses))
    } catch (error) {
      console.error(error)
    }
  }

  // Respaldo al formato antiguo (doc principal + history) cuando aún no hay semanas.
  // Carga TODO de una vez y marca legacy para que App.vue no lance el background.
  async #restoreLegacy (email) {
    const mainDoc = await this.#repository.getMainFromDB(email)
    if (!mainDoc.exists()) return false

    const main = mainDoc.data()

    // Formato muy viejo: todo en un solo documento.
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

    let fees = []
    let expenses = []
    const snap = await this.#repository.getHistoryYears(email)
    if (snap && !snap.empty) {
      snap.forEach(docSnap => {
        const bucket = docSnap.data() || {}
        fees = fees.concat(bucket.fees || [])
        expenses = expenses.concat(bucket.expenses || [])
      })
    }
    localStorage.setItem('fees', JSON.stringify(fees))
    localStorage.setItem('expenses', JSON.stringify(expenses))
    return { legacy: true }
  }

  // Id de semana ISO: p.ej. '2026-W36'.
  #currentWeekId () {
    return moment().isoWeekYear() + '-W' + String(moment().isoWeek()).padStart(2, '0')
  }

  // Fecha (inicio de semana ISO) a partir del id '2026-W36'.
  #weekIdToDate (weekId) {
    const [yy, ww] = String(weekId).split('-W')
    return moment().isoWeekYear(parseInt(yy, 10)).isoWeek(parseInt(ww, 10)).startOf('isoWeek')
  }

  // Retención: conserva TODAS las semanas de los últimos 4 años; para lo más
  // viejo deja solo 1 semana por año. El baseline nunca se toca ni se borra.
  async #applyRetention (email, idx) {
    const ids = Array.isArray(idx.ids) ? idx.ids : []
    if (ids.length === 0) return

    const cutoff = moment().subtract(4, 'years')
    const keptOldYears = new Set()
    const toDelete = []

    const sorted = [...ids].sort().reverse() // más nuevas primero
    for (const id of sorted) {
      const date = this.#weekIdToDate(id)
      if (date.isAfter(cutoff)) continue // últimos 4 años: se conservan todas
      const year = date.isoWeekYear()
      if (!keptOldYears.has(year)) {
        keptOldYears.add(year) // adelgazamiento anual: 1 semana por año viejo
      } else {
        toDelete.push(id)
      }
    }

    if (toDelete.length === 0) return

    for (const id of toDelete) {
      await this.#deleteWeek(email, id)
    }
    idx.ids = ids.filter(id => !toDelete.includes(id))
    await this.#repository.setWeeksIndex(email, idx)
  }

  // Borra una semana completa: sus años (subcolección) y luego su meta.
  async #deleteWeek (email, weekId) {
    const snap = await this.#repository.getWeekYears(email, weekId)
    if (snap && !snap.empty) {
      for (const docSnap of snap.docs) {
        await this.#repository.deleteWeekYear(email, weekId, docSnap.id)
      }
    }
    await this.#repository.deleteWeekMeta(email, weekId)
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
}