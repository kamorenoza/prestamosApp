import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export default class SettingsRepository {
  getSettings(email) {
    const docRef = doc(db, "backup", email);

    return getDoc(docRef);
  }

  addSettings(name, email, maxi, version) {
    const amount = maxi.replaceAll('.', '')
    const settings = { name, email, maxi: amount, version };
    const ref = doc(db, "backup", email);

    return setDoc(ref, settings);
  }

  addSettingsLocal(name, email, maxi, version) {
    const amount = maxi.replaceAll('.', '')
    const settings = { name, email, maxi: amount, version };

    localStorage.setItem("settings", JSON.stringify(settings));
  }
}
