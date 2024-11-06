import SettingsRepository from "../models/settingsRepository";
import moment from "moment";

export default class SettingsUc {
  #repository;

  constructor() {
    this.#repository = new SettingsRepository();
  }


  async updateSettings(name, email, maxi, version) {
    try {
      this.#repository.addSettingsLocal(name, email, maxi, version);

      return "Configuración guardada correctamente";
    } catch (error) {
      console.error(error);
      return "Error guardando configuración";
    }
  }

  createSettings(name, email, maxi) {
    try {
      const settings = localStorage.getItem('settings')
      let version = moment().format('MM/DD/YYYY')
      if (settings) version = JSON.parse(settings).version

      this.#repository.addSettingsLocal(name, email, maxi, version);

      return "Configuración guardada correctamente";
    } catch (error) {
      console.error(error);
      return "Error guardando configuración";
    }
  }
}
