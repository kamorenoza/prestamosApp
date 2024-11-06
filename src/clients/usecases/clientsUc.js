import ClientsRepository from "../models/clientsRepository"
import LoansRepository from "@/loans/models/loansRepository";

export default class ClientsUc {
  #clientsRepository
  #loansRepository

  constructor() {
    this.#clientsRepository = new ClientsRepository()
    this.#loansRepository = new LoansRepository()
  }

  getClientByDocument(document) {
    return this.#clientsRepository.getClientByDoc(document)
  }

  getClientById(id) {
    return this.#clientsRepository.getClientById(id)
  }

  getAllClients() {
    return this.#clientsRepository.getClientsFromLocal()
  }

  getClientsByFilter(search) {
    return this.#clientsRepository.getClientsFromLocalBySearch(search)
  }

  saveClient(name, document, mobile, tel, address, nbh, comments, id) {
    let response = []

    if (!id) {
      response = this.#clientsRepository.addClientToLocal(name, document, mobile, tel, address, nbh, comments)
    } else {
      response = this.#clientsRepository.updateClientToLocal(id, name, document, mobile, tel, address, nbh, comments)
    }

    return response
  }

  deleteClient (id) {
    this.#loansRepository.deleteByClient(id)
    return this.#clientsRepository.deleteToLocal(id)
  }
}
