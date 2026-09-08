import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { db, auth } from '@/firebase/firebase'
import { doc, getDoc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore'

export default class LoginBackupRepository {
  login () {
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
  }

  logout () {
    return signOut(auth)
  }

  logoutLocal () {
    if (localStorage.getItem('settings')) localStorage.removeItem('settings')
    if (localStorage.getItem('fees')) localStorage.removeItem('fees')
    if (localStorage.getItem('loans')) localStorage.removeItem('loans')
    if (localStorage.getItem('clients')) localStorage.removeItem('clients')
    if (localStorage.getItem('expenses')) localStorage.removeItem('expenses')
  }

  getAllDataFromDB (email) {
    const docRef = doc(db, 'backup', email)

    return getDoc(docRef)
  }

  createBackupDB (data, user) {
    const ref = doc(db, 'backup', user)

    return setDoc(ref, data)
  }

  // Doc principal: settings + clients + loans (liviano y relacional).
  getMainFromDB (email) {
    return getDoc(doc(db, 'backup', email))
  }

  setMainDB (email, data) {
    return setDoc(doc(db, 'backup', email), data)
  }

  // Historial por año: backup/{email}/history/{year} con { fees, expenses }.
  getYearFromDB (email, year) {
    return getDoc(doc(db, 'backup', email, 'history', String(year)))
  }

  setYearDB (email, year, data) {
    return setDoc(doc(db, 'backup', email, 'history', String(year)), data)
  }

  getHistoryYears (email) {
    return getDocs(collection(db, 'backup', email, 'history'))
  }

  // ---- Modelo semanal (Opción 1): baseline inmutable + semanas ----

  // Índice liviano de semanas: { ids: [...], latest, baselineCreated }.
  getWeeksIndex (email) {
    return getDoc(doc(db, 'backup', email, 'meta', 'weeks'))
  }

  setWeeksIndex (email, data) {
    return setDoc(doc(db, 'backup', email, 'meta', 'weeks'), data)
  }

  // Baseline: copia permanente creada UNA sola vez. meta + años particionados.
  getFrozenBaselineMeta (email) {
    return getDoc(doc(db, 'backup', email, 'frozen', 'baseline'))
  }

  setFrozenBaselineMeta (email, data) {
    return setDoc(doc(db, 'backup', email, 'frozen', 'baseline'), data)
  }

  setFrozenBaselineYear (email, year, data) {
    return setDoc(doc(db, 'backup', email, 'frozen', 'baseline', 'years', String(year)), data)
  }

  // Semana: meta (settings + clients + loans) + años (fees + expenses).
  getWeekMeta (email, weekId) {
    return getDoc(doc(db, 'backup', email, 'weeks', weekId))
  }

  setWeekMeta (email, weekId, data) {
    return setDoc(doc(db, 'backup', email, 'weeks', weekId), data)
  }

  getWeekYear (email, weekId, year) {
    return getDoc(doc(db, 'backup', email, 'weeks', weekId, 'years', String(year)))
  }

  setWeekYear (email, weekId, year, data) {
    return setDoc(doc(db, 'backup', email, 'weeks', weekId, 'years', String(year)), data)
  }

  getWeekYears (email, weekId) {
    return getDocs(collection(db, 'backup', email, 'weeks', weekId, 'years'))
  }

  deleteWeekYear (email, weekId, year) {
    return deleteDoc(doc(db, 'backup', email, 'weeks', weekId, 'years', String(year)))
  }

  deleteWeekMeta (email, weekId) {
    return deleteDoc(doc(db, 'backup', email, 'weeks', weekId))
  }
}