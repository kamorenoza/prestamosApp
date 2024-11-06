import { utils } from "@/shared/utils"

export default class ClientsRepository {
  getClientsFromLocal() {
    const clients = localStorage.getItem("clients")

    return clients ? JSON.parse(clients) : []
  }

  getClientsFromLocalBySearch(search) {
    if (!search.trim()) return this.getClientsFromLocal()

    let clients = localStorage.getItem("clients")
    let clientsFilter = []

    if (clients) {
      clients = JSON.parse(clients)
      clientsFilter = clients.filter((client) => {
        let str = utils.normalizeText(client.name.toLowerCase())
        let doc = utils.normalizeText(client.document.toLowerCase())
        return str.indexOf(utils.normalizeText(search.toLowerCase())) >= 0 || doc.indexOf(utils.normalizeText(search.toLowerCase())) >= 0
      })
    }

    return clientsFilter
  }

  getClientByDoc(document) {
    let clients = localStorage.getItem("clients")
    let clientByDoc

    if (clients) {
      clients = JSON.parse(clients)
      clientByDoc = clients.find((client) => {
        return client.document === document
      })
    }

    return clientByDoc
  }

  getClientById(id) {
    let clients = localStorage.getItem("clients")
    let clientByDoc

    if (clients) {
      clients = JSON.parse(clients)
      clientByDoc = clients.find(client => client.id === id)
    }

    return clientByDoc
  }

  addClientToLocal(name, document, mobile, tel, address, nbh, comments) {
    const id = utils.getUId()

    let clients = localStorage.getItem("clients")
    clients = clients ? JSON.parse(clients) : []
    const client = { id, name, document, mobile, tel, address, nbh, comments }

    clients.push(client)
    localStorage.setItem("clients", JSON.stringify(clients))

    return { clients, client: client }
  }

  updateClientToLocal(id, name, document, mobile, tel, address, nbh, comments) {
    let clients = JSON.parse(localStorage.getItem("clients"))
    const client = { id, name, document, mobile, tel, address, nbh, comments }

    const index = clients.findIndex((client) => client.id === id)
    if (index !== -1) {
      clients[index] = client
    }
    localStorage.setItem("clients", JSON.stringify(clients))

    return { clients, client: client }
  }

  deleteToLocal(id) {
    let clients = JSON.parse(localStorage.getItem("clients"))

    const index = clients.findIndex((client) => client.id === id)
    if (index !== -1) {
      clients.splice(index, 1)
    }
    localStorage.setItem("clients", JSON.stringify(clients))

    return { clients }
  }
}
