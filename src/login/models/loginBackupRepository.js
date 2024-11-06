import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { db, auth } from '@/firebase/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

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
}
