// Sube un archivo JSON al Google Drive del usuario usando Google Identity Services (GIS).
// Requisitos:
//   - Script https://accounts.google.com/gsi/client cargado en public/index.html
//   - VUE_APP_GOOGLE_CLIENT_ID = OAuth 2.0 Web client id (el que ya usa Firebase para el login de Google)
//   - Drive API habilitada en Google Cloud y tu cuenta como "test user" en la pantalla de consentimiento.
// Scope 'drive.file': la app SOLO puede administrar los archivos que ella misma crea.

const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file'
const UPLOAD_URL = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart'

let tokenClient = null
let accessToken = null

function getTokenClient () {
  if (tokenClient) return tokenClient
  if (!window.google || !window.google.accounts || !window.google.accounts.oauth2) {
    throw new Error('Google Identity Services no está cargado')
  }
  tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
    scope: DRIVE_SCOPE,
    callback: () => {},
  })
  return tokenClient
}

function requestAccessToken () {
  return new Promise((resolve, reject) => {
    let client
    try {
      client = getTokenClient()
    } catch (error) {
      return reject(error)
    }

    client.callback = (resp) => {
      if (resp && resp.access_token) {
        accessToken = resp.access_token
        resolve(accessToken)
      } else {
        reject(new Error('No se obtuvo el token de Google Drive'))
      }
    }

    // Si ya hay token de esta sesión no vuelve a pedir consentimiento.
    client.requestAccessToken({ prompt: accessToken ? '' : 'consent' })
  })
}

export const googleDrive = {
  isConfigured () {
    return !!process.env.VUE_APP_GOOGLE_CLIENT_ID
  },

  async uploadJson (filename, dataObject) {
    const token = await requestAccessToken()

    const metadata = { name: filename, mimeType: 'application/json' }
    const boundary = 'backup_boundary_' + Date.now()
    const body =
      `--${boundary}\r\n` +
      'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
      JSON.stringify(metadata) + '\r\n' +
      `--${boundary}\r\n` +
      'Content-Type: application/json\r\n\r\n' +
      JSON.stringify(dataObject) + '\r\n' +
      `--${boundary}--`

    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body,
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Error subiendo a Drive: ${res.status} ${text}`)
    }

    return res.json()
  },
}